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
  Skeleton,
  Spinner,
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
  currentPhoto: string;
  setPhoto: React.Dispatch<React.SetStateAction<string>>;
  post: {
    caption: string;
    creative: string;
    search: string;
  };
};

const PhotoGrid: React.FC<PhotoGridProps> = ({
  currentPhoto,
  post,
  setPhoto,
}) => {
  const functions = getFunctions(getApp());
  connectFunctionsEmulator(functions, "127.0.0.1", 5001);
  const regenerateImages = httpsCallable(functions, "regenerateImages");
  const imageGenerator = httpsCallable(functions, "imageGenerator");

  const [photos, setPhotos] = useState<string[]>([]);
  const [nextPage, setNextPage] = useState("");
  const [loadingStates, setLoadingStates] = useState<Boolean[]>(
    Array(4).fill(true)
  );

  const handleImageLoad = (index: number) => {
    setLoadingStates((prevStates) => {
      const updatedStates = [...prevStates];
      updatedStates[index] = false;
      return updatedStates;
    });
  };

  const getImages = async () => {
    setLoadingStates(Array(4).fill(true));
    await imageGenerator({
      search: post.search,
    }).then((result: any) => {
      setPhotos(result.data.photos.map((photo: any) => photo.src.portrait));
      setNextPage(result.data.next_page);
    });
  };

  useEffect(() => {
    if (post.caption != "") {
      getImages();
    }
  }, [post]);

  return (
    <>
      <RadioGroup value={currentPhoto} onChange={setPhoto}>
        <SimpleGrid columns={{ lg: 2 }} spacing="20px">
          {loadingStates.map((isLoading, index) => (
            <Box key={index} m={2} maxWidth="220px">
              <label htmlFor={photos[index]}>
                {isLoading && (
                  <Skeleton
                    height="300px"
                    width="220px"
                    startColor="gray.400"
                    endColor="gray.600"
                    borderRadius={5}
                  ></Skeleton>
                )}
                <Box borderRadius="md" overflow="hidden">
                  <Image
                    src={photos[index]}
                    cursor="pointer"
                    onLoad={() => handleImageLoad(index)}
                    loading={"eager"}
                  />
                </Box>
                {/* </Skeleton> */}
              </label>
              <Center>
                <HStack mt={3}>
                  <Text>
                    {photos[index] == currentPhoto ? "Selected" : "Select"}
                  </Text>
                  <Radio
                    mt={3}
                    id={photos[index]}
                    value={photos[index]}
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
            setPhotos([]);
            setLoadingStates(Array(4).fill(true));
            regenerateImages({ next_page_url: nextPage }).then(
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
          isLoading={loadingStates.some(state => state === true)}
          id="RegenerateButton"
        >
          Regenerate
        </Button>
      </Center>
    </>
  );
};

export default PhotoGrid;
