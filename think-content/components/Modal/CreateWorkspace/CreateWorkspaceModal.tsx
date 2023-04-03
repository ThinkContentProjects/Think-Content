import { db, auth } from "@/firebase/firebase";
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
} from "@chakra-ui/react";
import {
  doc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

type CreateWorkspaceModalProps = {
  open: boolean;
  handleClose: () => void;
};

const CreateWorkspaceModal: React.FC<CreateWorkspaceModalProps> = ({
  open,
  handleClose,
}) => {
  const [user] = useAuthState(auth);
  const [workspaceName, setWorkspaceName] = useState("");
  const [charsRemaining, setCharsRemaining] = useState(21);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 21) return;
    setWorkspaceName(event.target.value);
    // recalculate how many chars we have left
    setCharsRemaining(21 - event.target.value.length);
  };

  const handleCreateWorkspace = async () => {
    if (error) setError("");
    // validate the workspace name
    const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (format.test(workspaceName) || workspaceName.length < 3) {
      setError(
        "Workspace names must be between 3 and 21 characters, and can only contain letters, numbers, or underscores"
      );
      return;
    }

    setLoading(true);

    try {
      const workspaceDocRef = doc(db, "workspaces", workspaceName);

      await runTransaction(db, async (transaction) => {
        // check if community exists in db
        const workspaceDoc = await transaction.get(workspaceDocRef);
        if (workspaceDoc.exists()) {
          throw new Error(`Sorry, ${workspaceName} is taken. Try another.`);
        }

        // async not needed for transaction sets, but we need them for transaction gets
        // create workspace
        transaction.set(workspaceDocRef, {
          creatorId: user?.uid,
          createdAt: serverTimestamp(),
          numberOfMembers: 1,
          members: [user?.uid],
        });

        // create workspace snippet for the user
        // collection/document/collection....
        transaction.set(
          doc(db, `users/${user?.uid}/workspaceSnippets`, workspaceName),
          {
            workspaceId: workspaceName,
            isOwner: true,
          }
        );
      });
    } catch (error: any) {
      console.log("handleCreateWorkspace error", error);
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <>
      <Modal isOpen={open} onClose={handleClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display="flex"
            flexDirection="column"
            fontSize={15}
            padding={3}
          >
            Create a Workspace
          </ModalHeader>
          <Box pl={3} pr={3}>
            <Divider />
            <ModalBody display="flex" flexDirection="column" padding="10px 0px">
              <Text fontWeight={600} fontSize={15}>
                Name
              </Text>
              <Text fontSize={11} color="gray.500">
                Workspace names cannot be changed
              </Text>
              <Input value={workspaceName} size="sm" onChange={handleChange} />
              <Text
                fontSize="9pt"
                color={charsRemaining === 0 ? "red" : "gray.500"}
              >
                {charsRemaining} Characters remaining
              </Text>
              <Text fontSize="9pt" color="red" pt={1}>
                {error}
              </Text>
            </ModalBody>
            <ModalCloseButton />
          </Box>
          <ModalFooter bg="gray.100" borderRadius="0px 0px 10px 10px">
            <Button
              variant="outline"
              height="30px"
              mr={3}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              height="30px"
              onClick={handleCreateWorkspace}
              isLoading={loading}
            >
              Create Workspace
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default CreateWorkspaceModal;
