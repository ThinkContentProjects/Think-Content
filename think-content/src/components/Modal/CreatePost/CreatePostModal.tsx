import { Post } from "@/src/atoms/postsAtom";
import { db, auth } from "@/src/firebase/firebase";
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
  Stack,
  Textarea,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { text } from "node:stream/consumers";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

type CreatePostModalProps = {
  open: boolean;
  handleClose: () => void;
};

const CreateWorkspaceModal: React.FC<CreatePostModalProps> = ({
  open,
  handleClose,
}) => {

  const router = useRouter();
  const [user] = useAuthState(auth);
  const [textInputs, setTextInputs] = useState({
    title: "",
    body: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value },
    } = event;
    setTextInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreatePost = async () => {
    const { workspaceId } = router.query;

    const newPost: Post = {
      workspaceId: workspaceId as string,
      creatorId: user.uid,
      creatorDisplayName: user.email!.split("@")[0],
      title: textInputs.title,
      body: textInputs.body,
      createdAt: serverTimestamp() as Timestamp,
    };

    setLoading(true);

    try {
      const postDocRef = await addDoc(collection(db, "posts"), newPost);
    } catch (error: any) {
      console.log("handleCreatePost Error", error.message);
      setError(true);
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
            Create a Post
          </ModalHeader>
          <Box pl={3} pr={3}>
            <Divider />
            <ModalBody display="flex" flexDirection="column" padding="10px 0px">
              <Stack spacing={3} width="100%">
                <Input
                  name="title"
                  value={textInputs.title}
                  onChange={onTextChange}
                  fontSize="10pt"
                  borderRadius={4}
                  placeholder="Title"
                  _placeholder={{ color: "gray.500" }}
                  _focus={{
                    outline: "none",
                    bg: "white",
                    border: "1px solid",
                    borderColor: "black",
                  }}
                />
                <Textarea
                  name="body"
                  value={textInputs.body}
                  onChange={onTextChange}
                  fontSize="10pt"
                  borderRadius={4}
                  height="100px"
                  placeholder="Body"
                  _placeholder={{ color: "gray.500" }}
                  _focus={{
                    outline: "none",
                    bg: "white",
                    border: "1px solid",
                    borderColor: "black",
                  }}
                />
              </Stack>
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
              height="34px"
              padding="0px 30px"
              disabled={!textInputs.title}
              onClick={handleCreatePost}
              isLoading={loading}
            >
              Post
            </Button>
          </ModalFooter>
          {error && (
                <Alert status='error'>
                <AlertIcon />
                <Text fontSize='10pt' mr={2}>Error creating post</Text>
              </Alert>
            )}
        </ModalContent>
      </Modal>
    </>
  );
};
export default CreateWorkspaceModal;
