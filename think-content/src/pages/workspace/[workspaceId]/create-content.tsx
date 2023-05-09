import CreatePostModal from "@/src/components/Modal/CreatePost/CreatePostModal";
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Input,
  Spacer,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { TbSparkles } from "react-icons/tb";

type createContentProps = {};

type TypeButtonProps = {
  name: string;
};

const TypeButton: React.FC<TypeButtonProps> = ({ name }) => {
  const bg = useColorModeValue("gray.100", "#27282A");
  return (
    <Box
      as="button"
      height="35px"
      width="150px"
      lineHeight="1.2"
      transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
      // border="1px"
      px="8px"
      borderRadius="20px"
      fontSize="14px"
      fontWeight="semibold"
      bg={bg}
      borderColor="#ccd0d5"
      //   color="#4b4f56"
      _hover={{ bg: "#767676" }}
      _active={{
        bg: "#dddfe2",
        transform: "scale(0.98)",
        borderColor: "#bec3c9",
      }}
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
        <Input bg={bg} mb={8} placeholder="Ex: Educational" height="75px" />
        <Text mb={3}>Format</Text>
        <HStack spacing={10} mb={10}>
          <TypeButton name="Feed Post" />
          <TypeButton name="Story" />
          <TypeButton name="Reel" />
          <TypeButton name="Carousal" />
        </HStack>
        <Text mb={2}> Additional Details</Text>
        <Textarea
          name="note"
          padding={5}
          borderRadius={18}
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
        />
        <Button
          mt={7}
          position="relative"
          left="calc(100% - 150px)"
          width="150px"
          rightIcon={<TbSparkles/>}
          onClick={() => setOpenCreatePostModal(true)}
        >
          Generate
        </Button>
      </Box>
    </Flex>
  );
};
export default createContent;
