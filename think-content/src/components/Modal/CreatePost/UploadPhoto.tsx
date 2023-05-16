import {
  Circle,
  VStack,
  Icon,
  Text,
  useColorModeValue,
  Center,
} from "@chakra-ui/react";
import React from "react";
import { MdOutlineAddBox } from "react-icons/md";

type UploadPhotoProps = {};

const UploadPhoto: React.FC<UploadPhotoProps> = () => {
  const bg = useColorModeValue("gray.100", "#27282A");

  return (
    <Center>
      <Circle as="button" bg={bg} color="white" size="300px" mt={20}>
        <VStack spacing={-4}>
            <Icon
              fontSize={200}
              color="grey.400"
              as={MdOutlineAddBox}
            />
            <Text>Upload a Photo</Text>
          </VStack>
      </Circle>
    </Center>
  );
};
export default UploadPhoto;
