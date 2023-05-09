import { authModalState } from "@/src/atoms/authModalAtom";
import { Button, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { useSetRecoilState } from "recoil";

type AuthButtonsProps = {};

const AuthButtons: React.FC<AuthButtonsProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const bg1 = useColorModeValue("gray.600", "#1E1F22");
  const bg2 = useColorModeValue("gray.400", "#414245");

  return (
    <>
      <Button
        height="40px"
        variant="solid"
        display={{ base: "none", sm: "flex" }}
        width={{ base: "60px", md: "90px" }}
        borderRadius="20px"
        fontSize="12pt"
        bg={bg1}
        mr={2}
        onClick={() => setAuthModalState({ open: true, view: "login" })}
        _hover={{
          color: "gray.200",
        }}
      >
        Log In
      </Button>
      <Button
        variant="solid"
        height="40px"
        borderRadius="20px"
        _hover={{
          color: "gray.200",
        }}
        display={{ base: "none", sm: "flex" }}
        width={{ base: "90px", md: "120px" }}
        fontSize="12pt"
        mr={2}
        bg={bg2}
        onClick={() => setAuthModalState({ open: true, view: "signup" })}
      >
        Get Started
      </Button>
    </>
  );
};

export default AuthButtons;
