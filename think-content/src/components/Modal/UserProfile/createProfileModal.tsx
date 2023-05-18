import { auth, db } from "@/src/firebase/firebase";
import useWorkspaceData from "@/src/hooks/useWorkspaceData";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  Divider,
  Text,
  Input,
  Select,
  useColorModeValue,
  useToast
} from "@chakra-ui/react";
import {
  collection,
  doc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";


type CreateProfileModalProps = {
    open: boolean;
    handleClose: () => void;
  };

const CreateProfileModal: React.FC<CreateProfileModalProps> = ({
  open,
  handleClose
}) => {
    const [user] = useAuthState(auth);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleCreateWorkspace = async () => {
        if (error) setError("");
        setLoading(false);
    };

    

    return (
    <>
      <Modal isOpen={open} onClose={handleClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <div>Header</div>
          </ModalHeader>
          <ModalBody>
            <div>Body</div>
          </ModalBody>
          <ModalFooter>
            <div>Footer</div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
    );
};

export default CreateProfileModal;