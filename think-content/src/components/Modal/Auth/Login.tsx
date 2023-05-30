import { authModalState } from "@/src/atoms/authModalAtom";
import { FIREBASE_ERRORS } from "@/src/firebase/errors";
import { auth, db } from "@/src/firebase/firebase";
import {
  Button,
  Flex,
  HStack,
  Input,
  Spacer,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Router, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";
import useWorkspaceData from "@/src/hooks/useWorkspaceData";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const setAuthModelState = useSetRecoilState(authModalState);
  const router = useRouter();

  const bg = useColorModeValue("gray.100", "#27282A");
  const textColor = useColorModeValue("Black", "White");

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [signInWithEmailAndPassword, userCred, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const { getRecentWorkspace } = useWorkspaceData()

  // firebase logic
  // also redirect the user to a previous router if they were redirected here!
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signInWithEmailAndPassword(loginForm.email, loginForm.password);
  };

  useEffect(() => {
    if (userCred) {
      getRecentWorkspace(userCred.user).then((workspaceId) => {
        router.push(
          router.query.from
            ? decodeURIComponent(router.query.from as string)
            : `/workspace/${workspaceId}`
        );
      });
    }
  }, [userCred]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //update form state
    setLoginForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <form onSubmit={onSubmit}>
      <Text fontSize="15">Your Email</Text>
      <Input
        bg={bg}
        required
        name="email"
        placeholder="email"
        type="email"
        mb={2}
        onChange={onChange}
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        color={textColor}
      />
      <Text as="span" fontSize="15">
        Your Password
      </Text>
      <Input
        bg={bg}
        name="password"
        required
        placeholder="password"
        type="password"
        mb={2}
        onChange={onChange}
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        color={textColor}
      />

      <Text textAlign="center" color="red" fontSize="10pt">
        {FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}
      </Text>

      <HStack pt={3}>
        <HStack>
          <Text
            as="u"
            fontSize="10pt"
            cursor="pointer"
            onClick={() =>
              setAuthModelState((prev) => ({
                ...prev,
                view: "resetPassword",
              }))
            }
          >
            Recover Password
          </Text>
          <Text>•</Text>
          <Text
            as="u"
            cursor="pointer"
            fontSize="10pt"
            onClick={() =>
              setAuthModelState((prev) => ({
                ...prev,
                view: "signup",
              }))
            }
          >
            Sign Up
          </Text>
        </HStack>
        <Spacer />
        <Button
          backgroundColor="White"
          width="25%"
          border= "1px solid"
          color="Black"
          borderColor= "gray.100"
          height="36px"
          mt={2}
          mb={2}
          _hover = {{
            borderColor: "blue.500",
          }}
          type="submit"
          isLoading={loading}
        >
          Log In
        </Button>
      </HStack>
    </form>
  );
};
export default Login;
