import {
  SimpleGrid,
  Box,
  Image,
  Button,
  Center,
  Radio,
  RadioGroup,
  Text,
  HStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { TbSparkles } from "react-icons/tb";

type PhotoGridProps = {
  photos: Array<string>;
  currentPhoto: string;
  setPhoto: any;
};

const PhotoGrid: React.FC<PhotoGridProps> = ({ photos, currentPhoto, setPhoto }) => {

  return (
    <>
      <RadioGroup value={currentPhoto} onChange={setPhoto}>
        <SimpleGrid columns={{ lg: 2 }} spacing="20px">
          {photos.map((url) => (
            <Box key={url} m={2} maxWidth="220px">
              <label htmlFor={url}>
                <Image src={url} cursor="pointer"/>
              </label>
              <Center>
              <HStack mt={3}>
                <Text>Selected</Text>
                <Radio mt={3} id={url} value={url} size="lg" colorScheme="green"/>
              </HStack>
              </Center>
            </Box>
          ))}
        </SimpleGrid>
      </RadioGroup>
      <Center>
        <Button rightIcon={<TbSparkles />} mt={5}>
          Regenerate
        </Button>
      </Center>
    </>
  );
};
export default PhotoGrid;
