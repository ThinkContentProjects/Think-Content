import { Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

const Pricing: React.FC = () => {
  const router = useRouter();

  return (
    <Flex
      cursor="pointer"
      mr={6}
      padding="0px 6px"
      borderRadius={2}
      _hover={{ bg: "blue.100", color: "blue.500" }}
      onClick={() => router.push("/billing")}
    >
      <Text fontWeight={700} fontSize="12pt">
        Pricing
      </Text>
    </Flex>
  );
};
export default Pricing;
