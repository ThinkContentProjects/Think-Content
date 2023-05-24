import { authModalState } from "@/src/atoms/authModalAtom";
import { Input, Button, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { FIREBASE_ERRORS } from "@/src/firebase/errors";
import { auth, db } from "@/src/firebase/firebase";
import { collection, doc, runTransaction, serverTimestamp } from "firebase/firestore";
import {User } from "firebase/auth";
import router from "next/router";
import { workspaceState } from "@/src/atoms/workspacesAtom";
import useWorkspaceData from "@/src/hooks/useWorkspaceData";

const SignUp: React.FC = () => {
  const setAuthModelState = useSetRecoilState(authModalState);

  const [signUpForm, setSignupForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loadingWorkspace, setLoadingWorkspace] = useState(false)
  const [createUserWithEmailAndPassword, userCred, loading, userError] =
    useCreateUserWithEmailAndPassword(auth);
    const [workspaceStateValue, setWorkspaceStateValue] =
  useRecoilState(workspaceState);
  const { getMySnippets } = useWorkspaceData()

  const createInitialWorkspace = async (user: User) =>  {
    
    setLoadingWorkspace(true);
    // should be inside try block?
    const workspaceDocRef = doc(collection(db, "workspaces"));

    try 
    {
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
       },
     }));
     router.push(`/workspace/${workspaceDocRef.id}`);
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
    if(userCred) {
      createInitialWorkspace(userCred.user)
    }
  }, [userCred])

  return (
    <form onSubmit={onSubmit}>
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
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        color="black"
        bg="gray.50"
      />
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
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg="gray.50"
        color="black"
      />
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
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg="gray.50"
        color="black"
      />

      <Text textAlign="center" color="red" fontSize="10pt">
        {error ||
          FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]}
      </Text>

      <Button
        width="100%"
        height="36px"
        mt={2}
        mb={2}
        type="submit"
        isLoading={loading}
      >
        Sign Up
      </Button>
      <Flex fontSize="9pt" justifyContent="center">
        <Text mr={1}>Already a thinker?</Text>
        <Text
          color="blue.500"
          fontWeight={700}
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
      </Flex>
    </form>
  );
};

export default SignUp;
