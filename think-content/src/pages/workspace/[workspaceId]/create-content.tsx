import CreatePostModal from "@/src/components/Modal/CreatePost/CreatePostModal";
import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Text,
  Textarea,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { TbSparkles } from "react-icons/tb";
import { getFunctions, httpsCallable } from "firebase/functions";

type createContentProps = {};

type TypeButtonProps = {
  name: string;
  handleClick: () => void;
};

const TypeButton: React.FC<TypeButtonProps> = ({ name, handleClick }) => {
  const bg = useColorModeValue("gray.100", "#27282A");

  return (
    <Box
      as="button"
      height="35px"
      width="150px"
      lineHeight="1.2"
      transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
      px="8px"
      borderRadius="20px"
      fontSize="14px"
      fontWeight="semibold"
      bg={bg}
      borderColor="#ccd0d5"
      _hover={{ bg: "#767676" }}
      _active={{
        bg: "#dddfe2",
        transform: "scale(0.98)",
        borderColor: "#bec3c9",
      }}
      onClick={handleClick}
      _focus={{
        boxShadow:
          "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
        bg: "#915EFF",
      }}
    >
      {name}
    </Box>
  );
};

const createContent: React.FC<createContentProps> = () => {
  const [openCreatePostModal, setOpenCreatePostModal] = useState(false);
  const bg = useColorModeValue("gray.100", "#27282A");
  const functions = getFunctions();
  const postGenerator = httpsCallable(functions, "postGenerator");
  const [caption, setCaption] = useState("");

  const [textInputs, setTextInputs] = useState({
    type: "",
    format: "",
    details: "",
  });

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
    <Flex display="flex" flexDirection="column" padding={16}>
      <VStack align="left" spacing={1} mb={10}>
        <Text fontSize="25pt" fontWeight={800}>
          Create Content
        </Text>
        <Text>Generate creatives and captions</Text>
      </VStack>
      <Box alignSelf="center" w={{ base: "300px", md: "400px", lg: "700px" }}>
        <Text mb={3} textAlign="left">
          Type of Post
        </Text>
        <Input
          name="type"
          bg={bg}
          onChange={onTextChange}
          mb={8}
          placeholder="Ex: Educational"
          height="75px"
        />
        <Text mb={3}>Format</Text>
        <HStack spacing={10} mb={10}>
          <TypeButton
            name="Feed Post"
            handleClick={() => {
              setTextInputs((prev) => ({
                ...prev,
                format: "Feed Post",
              }));
            }}
          />
          <TypeButton
            name="Story"
            handleClick={() => {
              setTextInputs((prev) => ({
                ...prev,
                format: "Story",
              }));
            }}
          />
          <TypeButton
            name="Reel"
            handleClick={() => {
              setTextInputs((prev) => ({
                ...prev,
                format: "Reel",
              }));
            }}
          />
          <TypeButton
            name="Carousal"
            handleClick={() => {
              setTextInputs((prev) => ({
                ...prev,
                format: "Carousal",
              }));
            }}
          />
        </HStack>
        <Text mb={2}> Additional Details</Text>
        <Textarea
          name="details"
          padding={5}
          borderRadius={18}
          onChange={onTextChange}
          bg={bg}
          height="150px"
          placeholder="Ex: Educate our audience of the benefits of our product"
          _focus={{
            outline: "none",
            border: "1px solid",
            borderColor: "black",
          }}
        />
        <CreatePostModal
          open={openCreatePostModal}
          handleClose={() => setOpenCreatePostModal(false)}
          caption={caption}
        />
        <Button
          mt={7}
          position="relative"
          left="calc(100% - 150px)"
          width="150px"
          rightIcon={<TbSparkles />}
          onClick={() => {
            setOpenCreatePostModal(true);
            postGenerator(textInputs).then((result) => {
              setCaption(result.data.choices[0].text.split("Caption: ")[1]);
            });
          }}
        >
          Generate
        </Button>
      </Box>
    </Flex>
  );
};
export default createContent;
