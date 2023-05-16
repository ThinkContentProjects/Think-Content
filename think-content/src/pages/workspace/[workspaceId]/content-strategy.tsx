import { postGenerator } from '@/functions/src';
import CreatePostModal from '@/src/components/Modal/CreatePost/CreatePostModal';
import { Flex, VStack, Input, Textarea, Button, Text, Box} from '@chakra-ui/react';
import React from 'react';
import { TbSparkles } from 'react-icons/tb';

type contentStrategyProps = {
    
};

const contentStrategy:React.FC<contentStrategyProps> = () => {
    
    return (<Flex display="flex" flexDirection="column" padding={16}>
    <VStack align="left" spacing={1} mb={10}>
      <Text fontSize="25pt" fontWeight={800}>
        Content Strategy
      </Text>
      <Text>Generate a weekly content strategy</Text>
    </VStack>
    <Box alignSelf="center" w={{ base: "300px", md: "400px", lg: "700px" }}>
      <Text mb={3} textAlign="left">
        Weekly Goal
      </Text>
      <Input
        name="type"
        onChange={() => {}}
        mb={8}
        placeholder="Ex: Educational"
        height="75px"
      />
      <Text mb={3} textAlign="left">
        Aggression Level
      </Text>
      <Input
        name="type"
        onChange={() => {}}
        mb={8}
        placeholder="Ex: Educational"
        height="75px"
      />
      <Text mb={2}> Additional Details</Text>
      <Textarea
        name="details"
        padding={5}
        borderRadius={18}
        onChange={() => {}}
        height="150px"
        placeholder="Ex: Educate our audience of the benefits of our product"
        _focus={{
          outline: "none",
          border: "1px solid",
          borderColor: "black",
        }}
      />
      <Button
        mt={7}
        position="relative"
        left="calc(100% - 150px)"
        width="150px"
        rightIcon={<TbSparkles />}
        onClick={() => {}}
      >
        Generate
      </Button>
    </Box>
  </Flex>)
}
export default contentStrategy;