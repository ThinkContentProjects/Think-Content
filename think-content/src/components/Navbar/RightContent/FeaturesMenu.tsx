import { AddIcon, ChevronDownIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  Text,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
  Box,
} from "@chakra-ui/react";
import React from "react";

const FeaturesMenu: React.FC = () => {
  return (
    <Menu >
      <MenuButton
        cursor="pointer"
        mr={4}
        padding="0px 6px"
        borderRadius={4}
        _hover={{ bg: "purple.100", color: "purple.600" }}
      >
        <Flex align="center" display={{ base: "none", md: "flex" }}>
          <Flex align="center"> 
            <Text fontWeight={700} fontSize="12pt">
              Features
            </Text>
          </Flex>
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList>
        <MenuItem
          fontSize="11pt"
          fontWeight={500}
          _hover={{ bg: "purple.600", color: "white" }}
        >
          <Flex align="center">
            Overview
          </Flex>
        </MenuItem>
        <MenuItem
          fontSize="11pt"
          fontWeight={500}
          _hover={{ bg: "purple.600", color: "white" }}
        >
          <Flex align="center">
            Content
          </Flex>
        </MenuItem>
        <MenuItem
          fontSize="11pt"
          fontWeight={500}
          _hover={{ bg: "purple.600", color: "white" }}
        >
          <Flex align="center">
            Scheduler
          </Flex>
        </MenuItem>
        <MenuItem
          fontSize="11pt"
          fontWeight={500}
          _hover={{ bg: "purple.600", color: "white" }}
        >
          <Flex align="center">
            Campaign
          </Flex>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default FeaturesMenu;
