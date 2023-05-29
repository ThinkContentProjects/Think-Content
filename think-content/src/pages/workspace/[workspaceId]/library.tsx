import React from "react";
import { Flex, Text, VStack } from "@chakra-ui/react";
import useWorkspaceData from "@/src/hooks/useWorkspaceData";
import { withProtected } from "@/src/hooks/routes";

type libraryProps = {};

const library: React.FC<libraryProps> = () => {
  const { workspaceStateValue } = useWorkspaceData();

  return (
    <Flex display="flex" flexDirection="column" padding={16}>
      <VStack align="left" spacing={1} mb={10}>
        <Text fontSize="25pt" fontWeight={800}>
          Library
        </Text>
        <Text>Access all of your assets and saved outputs</Text>
      </VStack>
    </Flex>
  );
};
export default withProtected(library);
