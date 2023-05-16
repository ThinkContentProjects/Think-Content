import { Post } from "@/src/atoms/postsAtom";
import { db, auth } from "@/src/firebase/firebase";
import { getFunctions, httpsCallable } from "firebase/functions";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Image,
  Box,
  Text,
  Textarea,
  Alert,
  AlertIcon,
  SimpleGrid,
  ButtonGroup,
  Icon,
  Circle,
  VStack,
  useColorModeValue,
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
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { MdOutlineAddBox } from "react-icons/md";
import { TbSparkles } from "react-icons/tb";

type CreatePostModalProps = {
  open: boolean;
  handleClose: () => void;
  caption: string;
};

const CreateWorkspaceModal: React.FC<CreatePostModalProps> = ({
  open,
  handleClose,
  caption
}) => {
  const functions = getFunctions();
  const postGenerator = httpsCallable(functions, "postGenerator");
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [textInputs, setTextInputs] = useState({
    type: "",
    format: "",
    note: "",
  });
  const bg = useColorModeValue("gray.100", "#27282A");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [photoGeneration, setPhotoGeneration] = useState(true);

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

  return (
    <>
      <Modal isOpen={open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent maxW="1400px">
          <ModalHeader
            display="flex"
            flexDirection="row"
            fontSize={15}
            padding={3}
          >
            {/* AI Workshop */}
          </ModalHeader>
          <SimpleGrid minChildWidth="100px">
            <Box>
              <Text ml={10} fontSize="22pt" fontWeight={700}>
                Creatives
              </Text>
              <Box
                mt={3}
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDir="column"
              >
                <ButtonGroup>
                  <Button
                    bg={photoGeneration ? "#27282A" : { bg }}
                    borderRadius={8}
                    width="150px"
                    onClick={() => setPhotoGeneration(true)}
                  >
                    AI Generated
                  </Button>
                  <Button
                    bg={photoGeneration ? { bg } : "#27282A"}
                    borderRadius={8}
                    width="150px"
                    onClick={() => setPhotoGeneration(false)}
                  >
                    Upload
                  </Button>
                </ButtonGroup>
                {photoGeneration ? (
                  <SimpleGrid columns={{ lg: 2 }} spacing="20px" mt={7}>
                    <Box
                      height="312.5px"
                      width="250px"
                      as="button"
                      _focus={{
                        boxShadow:
                          "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
                      }}
                    >
                      <Image height="312.5px" width="250px"></Image>
                    </Box>
                    <Box
                      height="312.5px"
                      width="250px"
                      as="button"
                      _focus={{
                        boxShadow:
                          "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
                      }}
                    >
                      <Image height="312.5px" width="250px"></Image>
                    </Box>
                    <Box
                      height="312.5px"
                      width="250px"
                      as="button"
                      _focus={{
                        boxShadow:
                          "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
                      }}
                    >
                      <Image height="312.5px" width="250px"></Image>
                    </Box>
                    <Box
                      height="312.5px"
                      width="250px"
                      as="button"
                      _focus={{
                        boxShadow:
                          "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
                      }}
                    >
                      <Image height="312.5px" width="250px"></Image>
                    </Box>
                  </SimpleGrid>
                ) : (
                  <Circle
                    as="button"
                    bg={bg}
                    color="white"
                    size="320px"
                    mt={20}
                  >
                    <VStack spacing={-4}>
                      <Icon
                        fontSize={200}
                        color="grey.400"
                        as={MdOutlineAddBox}
                      />
                      <Text>Upload a Photo</Text>
                    </VStack>
                  </Circle>
                )}
              </Box>
              {photoGeneration && (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexDir="column"
                >
                  <Button rightIcon={<TbSparkles />} mt={5}>
                    Regenerate
                  </Button>
                </Box>
              )}
            </Box>
            <Box>
              <Text fontSize="22pt" fontWeight={700}>
                Selected Creative
              </Text>
              <Box
                mt={10}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {photoGeneration ? (
                  <Image align="center" width="300px" height="375px"></Image>
                ) : (
                  <Text width="300px" height="375px">Please select or upload a creative</Text>
                )}
              </Box>
              <Text fontSize="22pt" fontWeight={700}>
                Caption
              </Text>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDir="column"
              >
                <Textarea
                  mt={5}
                  name="note"
                  fontSize="13pt"
                  maxWidth="600px"
                  borderRadius={20}
                  height="100px"
                  value={caption}
                  onChange={() => {}}
                  bg={bg}
                  _focus={{
                    outline: "none",
                    border: "1px solid",
                    borderColor: "black",
                  }}
                />
                <Button rightIcon={<TbSparkles />} mt={7}>
                  Regenerate
                </Button>
              </Box>
            </Box>
          </SimpleGrid>
          <ModalFooter borderRadius="0px 0px 10px 10px">
            <Button bg="#15AE11" width="120px" mr={3} onClick={handleClose}>
              Schedule
            </Button>
            <Button
              width="120px"
              padding="0px 30px"
              disabled={!textInputs.type || !textInputs.format}
              isLoading={loading}
            >
              Save Draft
            </Button>
          </ModalFooter>
          {error && (
            <Alert status="error">
              <AlertIcon />
              <Text fontSize="10pt" mr={2}>
                Error creating post
              </Text>
            </Alert>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateWorkspaceModal;
