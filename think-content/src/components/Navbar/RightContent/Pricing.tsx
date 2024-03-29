import { Flex, Icon, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { FaRegGem } from "react-icons/fa";

const Pricing: React.FC = () => {
  const router = useRouter();

  return (
    <Flex
      cursor="pointer"
      mr={6}
      padding="0px 6px"
      borderRadius={2}
      display={{ base: "none", md: "flex" }}
      _hover={{ bg: "purple.100", color: "purple.600" }}
      onClick={() => router.push("/pricing")}
      
    >
      <Text fontWeight={700} fontSize="12pt">
        Pricing
      </Text>
    </Flex>
  );
};
export default Pricing;
