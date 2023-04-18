import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  Icon,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { CiVideoOn, CiCircleQuestion, CiEdit } from 'react-icons/ci';

const ResourceMenu: React.FC = () => {
  return (
    <Menu>
      <MenuButton
        cursor="pointer"
        mr={4}
        padding="0px 6px"
        borderRadius={4}
        _hover={{ bg: "purple.100", color: "purple.500" }}
      >
        <Flex align="center" display={{ base: "none", md: "flex" }}>
          <Flex align="center"> 
            <Text fontWeight={700} fontSize="12pt" >
              Resources
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
            <Icon fontSize={20} mr={2} as={CiEdit} />
            Blogs
          </Flex>
        </MenuItem>
        <MenuItem
          fontSize="11pt"
          fontWeight={500}
          _hover={{ bg: "purple.600", color: "white" }}
        >
          <Flex align="center">
            <Icon fontSize={20} mr={2} as={CiVideoOn} />
            Videos
          </Flex>
        </MenuItem>
        <MenuItem
          fontSize="11pt"
          fontWeight={500}
          _hover={{ bg: "purple.600", color: "white" }}
        >
          <Flex align="center">
            <Icon fontSize={20} mr={2} as={CiCircleQuestion} />
            Help Center
          </Flex>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ResourceMenu;
