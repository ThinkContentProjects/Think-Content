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
import React, { useEffect, useState } from "react";
import { TbSparkles } from "react-icons/tb";
import { getApp } from "firebase/app";

import {
  getFunctions,
  httpsCallable,
  connectFunctionsEmulator,
} from "firebase/functions";

type PhotoGridProps = {
  photos: Array<string>;
  currentPhoto: string;
  setPhoto: any;
  nextPage: string;
};

const PhotoGrid: React.FC<PhotoGridProps> = ({
  photos,
  currentPhoto,
  setPhoto,
  nextPage,
}) => {
  const functions = getFunctions(getApp());
  connectFunctionsEmulator(functions, "127.0.0.1", 5001);
  const regenerateImages = httpsCallable(functions, "regenerateImages");
  const [generatedPhotos, setPhotos] = useState(photos);
  const [next_page, setNextPage] = useState(nextPage);

  useEffect(() => {
    setPhotos(photos);
    setNextPage(nextPage);
  }, [photos]);

  return (
    <>
      <RadioGroup value={currentPhoto} onChange={setPhoto}>
        <SimpleGrid columns={{ lg: 2 }} spacing="20px">
          {generatedPhotos.map((url) => (
            <Box key={url} m={2} maxWidth="220px">
              <label htmlFor={url}>
                <Image src={url} cursor="pointer" />
              </label>
              <Center>
                <HStack mt={3}>
                  <Text>{url == currentPhoto ? "Selected" : "Select"}</Text>
                  <Radio
                    mt={3}
                    id={url}
                    value={url}
                    size="lg"
                    colorScheme="green"
                  />
                </HStack>
              </Center>
            </Box>
          ))}
        </SimpleGrid>
      </RadioGroup>
      <Center>
        <Button
          onClick={() => {
            regenerateImages({ next_page_url: next_page }).then(
              (result: any) => {
                setPhotos(
                  result.data.photos.map((photo: any) => photo.src.portrait)
                );
                setNextPage(result.data.next_page);
              }
            );
          }}
          rightIcon={<TbSparkles />}
          mt={5}
        >
          Regenerate
        </Button>
      </Center>
    </>
  );
};

export default PhotoGrid;