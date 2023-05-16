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
  useRadioGroup,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { TbSparkles } from "react-icons/tb";
import { getFunctions, httpsCallable } from "firebase/functions";
import RadioCard from "@/src/components/RadioCard/RadioCard";

type createContentProps = {};

const createContent: React.FC<createContentProps> = () => {
  const [openCreatePostModal, setOpenCreatePostModal] = useState(false);
  const bg = useColorModeValue("gray.100", "#27282A");
  const functions = getFunctions();
  const postGenerator = httpsCallable(functions, "postGenerator");
  const picGenerator = httpsCallable(functions, "picGenerator");
  const [caption, setCaption] = useState("");
  const [photos, setPhotos] = useState([]);

  const options = ["Feed Post", "Story", "Reel", "Carousal"];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: "Feed Post",
    onChange: (e) => {
      setTextInputs((prev) => ({
        ...prev,
        format: "Story",
      }));
    },
  });

  const group = getRootProps();

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
        <HStack {...group} justifyContent="space-between" mb={10}>
          {options.map((value) => {
            const radio = getRadioProps({ value });
            return (
              <RadioCard key={value} {...radio}>
                {value}
              </RadioCard>
            );
          })}
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
          photos={photos}
        />
        <Button
          mt={7}
          position="relative"
          left="calc(100% - 150px)"
          width="150px"
          rightIcon={<TbSparkles />}
          onClick={() => {
            setOpenCreatePostModal(true);
            postGenerator(textInputs).then((result: any) => {
              setCaption(result.data.choices[0].text.split("Caption: ")[1]);
              picGenerator({
                creative: result.data.choices[0].text.split("Caption: ")[0],
              }).then((result: any) => {
                setPhotos(
                  result.data.photos.map((photo: any) => photo.src.portrait)
                );
              });
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
