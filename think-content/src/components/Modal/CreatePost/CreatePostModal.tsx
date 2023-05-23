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
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  TabIndicator,
  Flex,
  Spinner,
  Center,
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
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { TbSparkles } from "react-icons/tb";
import PhotoGrid from "./PhotoGrid";
import UploadPhoto from "./UploadPhoto";
import {
  getFunctions,
  httpsCallable,
  connectFunctionsEmulator,
} from "firebase/functions";
import { getApp } from "firebase/app";

type CreatePostModalProps = {
  post: {
    caption: string;
    creative: string;
    photos: Array<string>;
    nextPage: string;
  };
  open: boolean;
  handleClose: () => void;
};

const CreatePostModal: React.FC<CreatePostModalProps> = ({
  open,
  post,
  handleClose,
}) => {
  const functions = getFunctions(getApp());
  connectFunctionsEmulator(functions, "127.0.0.1", 5001);
  const regenerateCaption = httpsCallable(functions, "regenerateCaption");
  const regenerateImages = httpsCallable(functions, "regenerateImages");
  const bg = useColorModeValue("gray.100", "#27282A");
  const [user] = useAuthState(auth);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [captionOutput, setCaption] = useState(post.caption);
  const [textInputs, setTextInputs] = useState({
    type: "",
    format: "",
    note: "",
  });

  const [selectedPhoto, setSelectedPhoto] = useState("");

  // const handleCreatePost = async () => {
  //   console.log("posted!");
  //   console.log(textInputs.body);
  //   postGenerator({ prompt: textInputs.body }).then((result) =>
  //     console.log(result.data)
  //   );
  //   const { workspaceId } = router.query;
  //   const newPost: Post = {
  //     workspaceId: workspaceId as string,
  //     creatorId: user.uid,
  //     creatorDisplayName: user.email!.split("@")[0],
  //     title: textInputs.title,
  //     body: textInputs.body,
  //     createdAt: serverTimestamp() as Timestamp,
  //   };
  //   setLoading(true);
  //   try {
  //     const postDocRef = await addDoc(collection(db, "posts"), newPost);
  //   } catch (error: any) {
  //     console.log("handleCreatePost Error", error.message);
  //     setError(error.message);
  //   }
  //   setLoading(false);
  // };

  useEffect(() => {
    setCaption(post.caption);
  }, [post.caption]);

  return (
    <>
      <Modal isOpen={open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent maxW="1400px" minHeight="1000px">
          {post.photos.length == 0 ? (
            <Box
              width="100%"
              maxWidth="1400px"
              minHeight="1000px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="purple.500"
                size="xl"
              />
            </Box>
          ) : (
            <>
              <ModalHeader
                display="flex"
                flexDirection="row"
                fontSize={15}
                padding={3}
              >
                {/* AI Workshop */}
              </ModalHeader>
              <SimpleGrid minChildWidth="100px">
                <Flex flexDirection="column">
                  <Text ml={10} fontSize="22pt" fontWeight={700}>
                    Creatives
                  </Text>
                  <Box
                    mt={10}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Tabs
                      onChange={(index) => setTabIndex(index)}
                      variant="unstyled"
                    >
                      <TabList>
                        <Tab
                          borderRadius={10}
                          _selected={{ color: "white", bg: "#915EFF" }}
                          minW="100px"
                        >
                          AI generated
                        </Tab>
                        <Tab
                          borderRadius={10}
                          _selected={{ color: "white", bg: "#915EFF" }}
                          minW="100px"
                        >
                          Upload
                        </Tab>
                      </TabList>
                      <TabPanels>
                        <TabPanel>
                          <PhotoGrid
                            photos={post.photos}
                            currentPhoto={selectedPhoto}
                            setPhoto={setSelectedPhoto}
                            nextPage={post.nextPage}
                          />
                        </TabPanel>
                        <TabPanel>
                          <UploadPhoto />
                        </TabPanel>
                      </TabPanels>
                    </Tabs>
                  </Box>
                </Flex>
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
                    {tabIndex == 0 ? (
                      <Image
                        src={selectedPhoto}
                        align="center"
                        height="375px"
                      ></Image>
                    ) : (
                      <Text width="300px" height="375px">
                        Please select or upload a creative
                      </Text>
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
                      value={captionOutput}
                      onChange={() => {}}
                      bg={bg}
                      _focus={{
                        outline: "none",
                        border: "1px solid",
                        borderColor: "black",
                      }}
                    />
                    <Button
                      rightIcon={<TbSparkles />}
                      mt={7}
                      onClick={() => {
                        regenerateCaption({
                          creative: post.creative,
                          caption: post.caption,
                        }).then((result: any) => {
                          console.log(result);
                          setCaption(result.data.caption);
                        });
                      }}
                    >
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
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePostModal;
