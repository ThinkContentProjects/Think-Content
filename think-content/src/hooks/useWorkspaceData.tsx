// hooks are used when we have functions and data that need to be shared across components

import {
  MemberSnippet,
  Workspace,
  WorkspaceSnippet,
  workspaceState,
} from "@/src/atoms/workspacesAtom";
import { auth, db } from "@/src/firebase/firebase";

import {
  collection,
  doc,
  getDocs,
  increment,
  writeBatch,
  arrayRemove,
  arrayUnion,
  query,
  where,
  runTransaction,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";

const useWorkspaceData = () => {
  // use this hook whenever accessing the user. Try to minimize by passing in as props when possible
  const [user] = useAuthState(auth);
  // read and write to the workspace state atom
  const [workspaceStateValue, setWorkspaceStateValue] =
    useRecoilState(workspaceState);
  // used for async loading times
  const [loading, setLoading] = useState(false);
  // error displaying
  const [error, setError] = useState("");

  // leaving workspaces
  const leaveWorkspace = async (workspaceData: Workspace) => {
    setLoading(true);

    try {
      // batch write
      const batch = writeBatch(db);

      // deleting the workspace snippet
      batch.delete(
        doc(db, `users/${user?.uid}/workspaceSnippets`, workspaceData.id)
      );

      // updating the number of members on the workspace (-1)
      batch.update(doc(db, "workspaces", workspaceData.id), {
        numberOfMembers: increment(-1),
      });

      // removing the user from the workspace member list
      batch.update(doc(db, "workspaces", workspaceData.id), {
        members: arrayRemove(user?.uid),
      });

      // commit the batch - all or nothing
      await batch.commit();

      // update the recoil state - workspaceState.mySnippets
      setWorkspaceStateValue((prev) => ({
        ...prev,
        mySnippets: prev.mySnippets.filter(
          (item) => item.workspaceId !== workspaceData.id
        ),
        // update the recoil state - member snippets
        memberSnippets: prev.memberSnippets.filter(
          (item) => item.uid !== user?.uid
        ),
      }));
    } catch (error: any) {
      console.log("leave workspace error", error.message);
      setError(error.message);
    }
    setLoading(false);
  };

  const updateRecentWorkspace = async (workspaceId: string) => {
    if (user != undefined) {
      await updateDoc(doc(db, "users", user.uid), {
       recentWorkspace: workspaceId
      });
    }
  };

  // takes in a string and gets the workspace - used for joining through notifications
  const joinWorkspace = async (workspaceId: string) => {
    setLoading(true);

    try {
      await runTransaction(db, async (transaction) => {
        // get the workspace from the workspace ID
        const workspaceRef = doc(db, "workspaces", workspaceId);
        const workspaceSnap = await transaction.get(workspaceRef);
        if (workspaceSnap.exists()) {
          const workspace = workspaceSnap.data();

          // creating a new workspace snippet
          const newSnippet: WorkspaceSnippet = {
            workspaceId: workspaceSnap.id,
            workspaceName: workspace.name,
            imageURL: workspace.imageURL || "",
            isOwner: false,
            numMembers: workspace.numberOfMembers,
          };

          // or with "" is not a good fix, need to come back to this
          const newMemberSnippet: MemberSnippet = {
            email: user?.email || "",
            uid: user?.uid || "",
            displayName: user?.displayName || "",
          };

          // add the new workspace snippet
          transaction.set(
            doc(db, `users/${user?.uid}/workspaceSnippets`, workspaceSnap.id),
            newSnippet
          );

          // updating the number of members on the workspace (+1)
          transaction.update(doc(db, "workspaces", workspaceSnap.id), {
            numberOfMembers: increment(1),
          });

          // adding the user to the array of users
          transaction.update(doc(db, "workspaces", workspaceSnap.id), {
            members: arrayUnion(user?.uid),
          });

          // update the recoil state - workspaceState.mySnippets and workspaceState.memberSnippets

          // this probably should not be inside of the transaction...
          setWorkspaceStateValue((prev) => ({
            ...prev,
            mySnippets: [...prev.mySnippets, newSnippet],
            memberSnippets: [...prev.memberSnippets, newMemberSnippet],
          }));
        }
      });
    } catch (error: any) {
      console.log("join workspace error", error);
      setError(error.message);
    }
    setLoading(false);
  };

  // function to get a user's workspace snippets
  const getMySnippets = async () => {
    setLoading(true);

    try {
      // get users snippets
      const snippetDocs = await getDocs(
        collection(db, `users/${user?.uid}/workspaceSnippets`)
      );

      // set the recoil state of the workspace atom, updating the snippets and setting snippetsFetched to true
      const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }));
      setWorkspaceStateValue((prev) => ({
        ...prev,
        mySnippets: snippets as WorkspaceSnippet[],
        snippetsFetched: true,
      }));
    } catch (error: any) {
      console.log("getMySnippets error", error);
      setError(error.message);
    }
    setLoading(false);
  };

  // I think it might make more sense for this to be a snippet in the workspaceStateAtom
  const getMembers = async () => {
    // dont get the members unless inside of a workspace
    if (workspaceStateValue.currentWorkspace) {
      setLoading(true);
      try {
        const usersQuery = query(
          collection(db, "users"),
          where("uid", "in", workspaceStateValue.currentWorkspace?.members)
        );

        const membersDocs = await getDocs(usersQuery);
        const members = membersDocs.docs.map((doc) => ({ ...doc.data() }));
        setWorkspaceStateValue((prev) => ({
          ...prev,
          memberSnippets: members as MemberSnippet[],
        }));
      } catch (error: any) {
        console.log("getMembers error", error);
        setError(error.message);
      }
      setLoading(false);
    }
  };

  // will trigger everytime user changes
  useEffect(() => {
    if (!user) {
      setWorkspaceStateValue((prev) => ({
        ...prev,
        mySnippets: [],
        snippetsFetched: false,
      }));
      return;
    }
    getMySnippets();
  }, [user]);

  // will trigger everytime workspace changes
  useEffect(() => {
    getMembers();
  }, [workspaceStateValue.currentWorkspace]);

  return {
    workspaceStateValue,
    joinWorkspace,
    leaveWorkspace,
    getMembers,
    getMySnippets,
    updateRecentWorkspace
  };
};

export default useWorkspaceData;
