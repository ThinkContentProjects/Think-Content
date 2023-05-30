import { authModalState } from "@/src/atoms/authModalAtom";
import {
  Input,
  Button,
  Flex,
  Text,
  HStack,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { FIREBASE_ERRORS } from "@/src/firebase/errors";
import { auth, db } from "@/src/firebase/firebase";
import {
  addDoc,
  collection,
  doc,
  runTransaction,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { User } from "firebase/auth";
import router from "next/router";
import { workspaceState } from "@/src/atoms/workspacesAtom";
import useWorkspaceData from "@/src/hooks/useWorkspaceData";
import { BrandProfile } from "@/src/atoms/brandProfilesAtom";
import { firestore } from "@firebase/testing";

const SignUp: React.FC = () => {
  const setAuthModelState = useSetRecoilState(authModalState);

  const [signUpForm, setSignupForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const bg = useColorModeValue("gray.100", "#27282A");
  const textColor = useColorModeValue("Black", "White");
  const [error, setError] = useState("");
  const [loadingWorkspace, setLoadingWorkspace] = useState(false);
  const [createUserWithEmailAndPassword, userCred, loading, userError] =
    useCreateUserWithEmailAndPassword(auth);
  const [workspaceStateValue, setWorkspaceStateValue] =
    useRecoilState(workspaceState);
  const { getMySnippets } = useWorkspaceData();

  const createInitialWorkspace = async (user: User) => {
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
      setError(error.message);
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
    }))
    router.push(`/workspace/${workspaceDocRef.id}`);
  };

  const createUserDocument = async (user: User) => {
    const userDocRef = doc(db, "users", user.uid);
    await setDoc(userDocRef, JSON.parse(JSON.stringify(user)));
  };

  // firebase logic
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (error) setError("");
    if (signUpForm.password !== signUpForm.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // passwords match
    createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //update form state
    setSignupForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    if (userCred) {
      createUserDocument(userCred.user).then(() =>
        createInitialWorkspace(userCred.user)
      );
    }
  }, [userCred]);

  return (
    <form onSubmit={onSubmit}>
      <Text as="span" fontSize="15">
        Email
      </Text>
      <Input
        required
        name="email"
        placeholder="email"
        type="email"
        mb={2}
        onChange={onChange}
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{
          // bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          // bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        color={textColor}
        bg={bg}
      />
      <Text as="span" fontSize="15">
        Password
      </Text>
      <Input
        name="password"
        required
        placeholder="password"
        type="password"
        mb={2}
        onChange={onChange}
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{
          // bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          // bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg={bg}
        color={textColor}
      />
      <Text as="span" fontSize="15">
        Confirm Password
      </Text>
      <Input
        name="confirmPassword"
        required
        placeholder="confirm password"
        type="password"
        mb={2}
        onChange={onChange}
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{
          // bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          // bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg={bg}
        color={textColor}
      />

      <Text textAlign="center" color="red" fontSize="10pt">
        {error ||
          FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]}
      </Text>
      <HStack pt={3}>
        <Text
          fontSize="10pt"
          as="u"
          cursor="pointer"
          onClick={() =>
            setAuthModelState((prev) => ({
              ...prev,
              view: "login",
            }))
          }
        >
          Log In
        </Text>
        <Spacer />
        <Button
          backgroundColor="White"
          fontSize="9pt"
          width="35%"
          border="1px solid"
          color="Black"
          borderColor="gray.100"
          height="36px"
          fontWeight={700}
          mt={2}
          mb={2}
          _hover={{
            borderColor: "blue.500",
          }}
          type="submit"
          isLoading={loading}
        >
          Create Account
        </Button>
      </HStack>
    </form>
  );
};

export default SignUp;
