import React from "react";
import { Flex, Text, VStack } from "@chakra-ui/react";
import useWorkspaceData from "@/src/hooks/useWorkspaceData";
import { withProtected } from "@/src/hooks/routes";

type campaignStrategyProps = {};

const campaignStrategy: React.FC<campaignStrategyProps> = () => {
  const { workspaceStateValue } = useWorkspaceData();

  return (
    <Flex display="flex" flexDirection="column" padding={16}>
      <VStack align="left" spacing={1} mb={10}>
        <Text fontSize="25pt" fontWeight={800}>
          Campaign Strategy
        </Text>
        <Text>Generate a detailed strategy for your campaign</Text>
      </VStack>
    </Flex>
  );
};
export default withProtected(campaignStrategy);
