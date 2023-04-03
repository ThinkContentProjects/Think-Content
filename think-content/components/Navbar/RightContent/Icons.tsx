import React from "react";
import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Icon, IconButton } from "@chakra-ui/react";
import { BsArrowUpRightCircle, BsChatDots } from "react-icons/bs";
import { GrAdd } from "react-icons/gr";
import {
  IoNotificationsOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { FaCrown } from "react-icons/fa";

type ActionIconsProps = {};

const ActionIcons: React.FC<ActionIconsProps> = () => {
  return (
    <Flex alignItems="center" flexGrow={1}>
      <Box
        display={{ base: "none", md: "flex" }}
        alignItems="center"
        borderRight="1px solid"
        borderColor="gray.200"
      >
        <Button
          variant="solid"
          height="28px"
          leftIcon={<FaCrown/>}
          display={{ base: "none", sm: "flex" }}
          width={{ base: "70px", md: "110px" }}
          mr={2}
        >
          Upgrade
        </Button>
      </Box>
      <>
        <Flex
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: "gray.200" }}
        >
          <Icon as={IoSettingsOutline} fontSize={20} />
        </Flex>
        <Flex
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: "gray.200" }}
        >
          <Icon as={IoNotificationsOutline} fontSize={20} />
        </Flex>
        <Flex
          display={{ base: "none", md: "flex" }}
          mr={3}
          ml={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: "gray.200" }}
        >
          <Icon as={BsChatDots} fontSize={20} />
        </Flex>
      </>
    </Flex>
  );
};
export default ActionIcons;
