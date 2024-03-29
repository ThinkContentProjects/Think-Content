import { authModalState } from "@/src/atoms/authModalAtom";
import { auth } from "@/src/firebase/firebase";
import {
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import ResetPassword from './resetPassword';
import AuthInputs from "./AuthInputs";
import OAuthButtons from "./OAuthButtons";

const AuthModal: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);
  const [user, loading, error] = useAuthState(auth);

  const handleClose = () => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }));
  };

  // runs when component mounts or dependencies change
  // runs every time the user object changes
  useEffect(() => {
    if (user) handleClose();
  }, [user]);

  return (
    <>
      <Modal isOpen={modalState.open} onClose={handleClose} size="lg">
        <ModalOverlay />
        <ModalContent borderRadius={30}>
          <ModalHeader textAlign="center" paddingTop={10}>
            {modalState.view === "login" && "Welcome Back"}
            {modalState.view === "signup" && "Create Account"}
            {modalState.view === "resetPassword" && "Reset Password"}
          </ModalHeader>
          <ModalBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            pb={6}
          >
            <Flex
              direction="column"
              align="center"
              justify="center"
              width="70%" 
            >
              {modalState.view === "login" || modalState.view === "signup" ? (
                <>
                  <OAuthButtons/>
                  <Text color="gray.400" fontWeight={500}>
                  </Text>
                  <AuthInputs />
                </>
              ) : (
                <ResetPassword />
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default AuthModal;
