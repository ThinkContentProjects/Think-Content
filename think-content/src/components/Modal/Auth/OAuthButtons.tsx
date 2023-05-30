import { BrandProfile } from "@/src/atoms/brandProfilesAtom";
import { workspaceState } from "@/src/atoms/workspacesAtom";
import { auth, db } from "@/src/firebase/firebase";
import useWorkspaceData from "@/src/hooks/useWorkspaceData";
import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import {
  getDocs,
  collection,
  doc,
  runTransaction,
  serverTimestamp,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";

const OAuthButtons: React.FC = () => {
  const [signInWithGoogle, userCred, loading, error] =
    useSignInWithGoogle(auth);
  const [loadingWorkspace, setLoadingWorkspace] = useState(false);
  const router = useRouter();
  const [workspaceStateValue, setWorkspaceStateValue] =
    useRecoilState(workspaceState);
  const { getMySnippets } = useWorkspaceData();

  const createInitialWorkspace = async (user: User) => {
    const snippetDocs = await getDocs(
      collection(db, `users/${user?.uid}/workspaceSnippets`)
    );
    // this is a new user without an initial workspace..
    if (snippetDocs.docs.length == 0) {
      // this is a duplicate code - move it to workspace hooks

      setLoadingWorkspace(true);
      // should be inside try block?
      const workspaceDocRef = doc(collection(db, "workspaces"));

      const brandProfile: BrandProfile = {
        name: "Products",
        industry: "retail",
        mission: "To sell products for less",
        message: "We sell prducts for less so you can live a better life",
        id: "",
      };

      try {

        await runTransaction(db, async (transaction) => {
          // async not needed for transaction sets, but we need them for transaction gets
          // create workspace
          transaction.set(workspaceDocRef, {
            creatorId: user?.uid,
            name: "Product 1",
            createdAt: serverTimestamp(),
            numberOfMembers: 1,
            members: [user?.uid],
            owner: user?.uid,
            brandProfile: brandProfile
          });

          // create workspace snippet for the user
          // collection/document/collection....
          transaction.set(
            doc(db, `users/${user?.uid}/workspaceSnippets`, workspaceDocRef.id),
            {
              workspaceId: workspaceDocRef.id,
              workspaceName: "Product 1",
              isOwner: true,
              numMembers: 1,
            }
          );

          // create recent workspace for the user
          transaction.update(doc(db, "users", user.uid), {
            recentWorkspace: workspaceDocRef.id,
          });

          const brandProfileDocRef = doc(
            collection(db, `users/${user?.uid}/brandProfiles`)
          );

          // Create brand profile document within the subcollection
          transaction.set(brandProfileDocRef, {
            name: "",
            industry: "",
            mission: "",
            message: "",
          });
        });
      } catch (error: any) {
        console.log("handleCreateWorkspace error", error);
        // setError(error.message);
      }

      /**
       * Again, this probably shouldnt be called here...
       */
      getMySnippets();
      // set the initial workspace in recoilState
      setWorkspaceStateValue((prev) => ({
        ...prev,
        currentWorkspace: {
          id: workspaceDocRef.id,
          name: "Product 1",
          creatorId: user?.uid,
          numberOfMembers: 1,
          members: [user?.uid],
          owner: user?.uid,
          brandProfile: brandProfile,
        },
      }));
      router.push(`/workspace/${workspaceDocRef.id}`);
    }
    // this is a returning user...
    // put them in their most recent workspace!
    else {
      getRecentWorkspace(user).then((workspaceId) => {
        router.push(
          router.query.from
            ? decodeURIComponent(router.query.from as string)
            : `/workspace/${workspaceId}`
        );
      });
    }
  };

  const getRecentWorkspace = async (user: User) => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().recentWorkspace;
    }
  };

  const createUserDocument = async (user: User) => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, JSON.parse(JSON.stringify(user)));
    }
  };

  useEffect(() => {
    if (userCred) {
      // issue is that only should set document when logging in...
      createUserDocument(userCred.user).then(() => {
        createInitialWorkspace(userCred.user);
      });
    }
  }, [userCred]);

  return (
    <Flex direction="column" width="80%" mb={4}>
      <Button
        variant="oauth"
        mb={2}
        isLoading={loading}
        onClick={() => signInWithGoogle()}
      >
        <Image src="/images/googlelogo.png" height="20px" mr={4} />
        Continue with Google
      </Button>
      {error && <Text>{error.message}</Text>}
    </Flex>
  );
};
export default OAuthButtons;
