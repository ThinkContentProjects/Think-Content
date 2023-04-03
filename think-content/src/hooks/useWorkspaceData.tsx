import {
  Workspace,
  WorkspaceSnippet,
  workspaceState,
} from "@/src/atoms/workspacesAtom";
import { auth, db } from "@/src/firebase/firebase";
import { getMembers } from "@/firebase/firestore/workspace";
import {
  collection,
  doc,
  getDocs,
  increment,
  writeBatch,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";

const useWorkspaceData = () => {
  const [user] = useAuthState(auth);
  const [workspaceStateValue, setWorkspaceStateValue] =
    useRecoilState(workspaceState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const leaveWorkspace = async (workspaceData: Workspace) => {
    setLoading(true);
    // batch write
    // deleting the workspace snippet
    // updating the number of members on the workspace (-1)
    // adding the user to the workspace member list
    // update the recoil state - workspaceState.mySnippets

    try {
      const batch = writeBatch(db);

      batch.delete(
        doc(db, `users/${user?.uid}/workspaceSnippets`, workspaceData.id)
      );

      batch.update(doc(db, "workspaces", workspaceData.id), {
        numberOfMembers: increment(-1),
      });

      batch.update(doc(db, "workspaces", workspaceData.id), {
        members: arrayRemove(user?.uid),
      });

      await batch.commit();

      setWorkspaceStateValue((prev) => ({
        ...prev,
        mySnippets: prev.mySnippets.filter(
          (item) => item.workspaceId !== workspaceData.id
        ),
      }));
    } catch (error: any) {
      console.log("leave workspace error", error.message);
      setError(error.message);
    }
    setLoading(false);
  };

  const joinWorkspace = async (workspaceData: Workspace) => {
    // batch write
    // creating a new workspace snippet
    // updating the number of members on the workspace (+1)
    // removing the user from the workspace member list
    setLoading(true);

    try {
      const batch = writeBatch(db);

      const newSnippet: WorkspaceSnippet = {
        workspaceId: workspaceData.id,
        imageURL: workspaceData.imageURL || "",
      };
      batch.set(
        doc(db, `users/${user?.uid}/communitySnippets`, workspaceData.id),
        newSnippet
      );

      batch.update(doc(db, "workspaces", workspaceData.id), {
        numberOfMembers: increment(1),
      });

      batch.update(doc(db, "workspaces", workspaceData.id), {
        members: arrayUnion(user?.uid),
      });

      await batch.commit();

      // update the recoil state - workspaceState.mySnippets
      setWorkspaceStateValue((prev) => ({
        ...prev,
        mySnippets: [...prev.mySnippets, newSnippet],
      }));
    } catch (error: any) {
      console.log("join workspace error", error);
      setError(error.message);
    }
    setLoading(false);
  };

  const getMySnippets = async () => 
  {
    setLoading(true);

    try {
      // get users snippets
      const snippetDocs = await getDocs(
        collection(db, `users/${user?.uid}/workspaceSnippets`)
      );

      const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }));
      setWorkspaceStateValue((prev) => ({
        ...prev,
        mySnippets: snippets as WorkspaceSnippet[],
        snippetsFetched: true,
      }));

      console.log("here are the snippets", snippets);
    } catch (error: any) {
      console.log("getMySnippets error", error);
      setError(error.message);
    }
    setLoading(false);
  };

  // will trigger everytime user changes
  useEffect(() => {
    if (!user) {
      setWorkspaceStateValue((prev) => ({
        ...prev,
        mySnippets: [],
        snippetsFetched: false,
      }));
      return 
    }
    getMySnippets();
  }, [user]);

  return {
    workspaceStateValue,
    joinWorkspace,
    leaveWorkspace,
  };
};

export default useWorkspaceData;
