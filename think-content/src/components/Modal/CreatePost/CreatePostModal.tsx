import { auth } from "@/src/firebase/firebase";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Image,
  Box,
  Text,
  Textarea,
  Alert,
  AlertIcon,
  SimpleGrid,
  useColorModeValue,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Flex,
  Spinner,
  Skeleton,
  Spacer,
  ModalCloseButton,
} from "@chakra-ui/react";

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
    search: string;
  };
  open: boolean;
  handleClose: () => void;
  setPost: React.Dispatch<
    React.SetStateAction<{
      caption: string;
      creative: string;
      search: string;
    }>
  >;
  generatingCaption: Boolean;
};

const CreatePostModal: React.FC<CreatePostModalProps> = ({
  open,
  post,
  setPost,
  handleClose,
  generatingCaption,
}) => {
  const functions = getFunctions(getApp());
  connectFunctionsEmulator(functions, "127.0.0.1", 5001);
  const regenerateCaption = httpsCallable(functions, "regenerateCaption");
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
  const [RegeneratingCaption, setRegeneratingCaption] = useState(false);

  const [selectedPhoto, setSelectedPhoto] = useState("");

  useEffect(() => {
    setCaption(post.caption);
  }, [post.caption]);

  return (
    <>
      <Modal
        isOpen={open}
        onClose={() => {
          handleClose();
          setPost({
            caption: "",
            creative: "",
            search: "",
          });
          setSelectedPhoto("");
        }}
      >
        <ModalOverlay />
        <ModalContent maxW="1400px" minHeight="1000px">
          <>
            <ModalHeader
              display="flex"
              flexDirection="row"
              fontSize={15}
              padding={3}
            >
              {/* AI Workshop */}
              <ModalCloseButton />
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
                    width="80%"
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
                          currentPhoto={selectedPhoto}
                          setPhoto={setSelectedPhoto}
                          post={post}
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
                    <Box borderRadius="md" overflow="hidden">
                      <Image
                        src={selectedPhoto}
                        align="center"
                        height="375px"
                        alt={"Pexels Generated Images"}
                      ></Image>
                    </Box>
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
                  <Skeleton
                    width="600px"
                    borderRadius={20}
                    height="200px"
                    startColor="gray.400"
                    endColor="gray.600"
                    isLoaded={!RegeneratingCaption && !generatingCaption}
                  >
                    <Textarea
                      mt={5}
                      name="note"
                      fontSize="13pt"
                      maxWidth="600px"
                      borderRadius={20}
                      height="200px"
                      value={captionOutput}
                      onChange={(e) => setCaption(e.target.value)}
                      bg={bg}
                      _focus={{
                        outline: "none",
                        border: "1px solid",
                        borderColor: "black",
                      }}
                    />
                  </Skeleton>
                  <Button
                    rightIcon={<TbSparkles />}
                    isLoading={RegeneratingCaption || generatingCaption}
                    mt={7}
                    onClick={() => {
                      setRegeneratingCaption(true);
                      regenerateCaption({
                        creative: post.creative,
                        caption: post.caption,
                      }).then((result: any) => {
                        setRegeneratingCaption(false);
                        setCaption(result.data.caption);
                      });
                    }}
                  >
                    Regenerate
                  </Button>
                </Box>
              </Box>
            </SimpleGrid>
            <Spacer />
            <ModalFooter borderRadius="0px 0px 10px 10px">
              <Button
                _hover={{ bg: 'green.400' }}
                bg="#15AE11"
                width="120px"
                mr={3}
                onClick={() => {
                  handleClose();
                  setPost({
                    caption: "",
                    creative: "",
                    search: "",
                  });
                  setSelectedPhoto("");
                }}
              >
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
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePostModal;
