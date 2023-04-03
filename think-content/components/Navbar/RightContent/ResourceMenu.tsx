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
import { BsCameraVideo } from "react-icons/bs";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { HiOutlinePencil } from "react-icons/hi";

const ResourceMenu: React.FC = () => {
  return (
    <Menu>
      <MenuButton
        cursor="pointer"
        mr={4}
        padding="0px 6px"
        borderRadius={4}
        _hover={{ bg: "blue.100", color: "blue.500" }}
      >
        <Flex align="center">
          <Flex align="center">
            <Text fontWeight={700} fontSize="12pt">
              Resources
            </Text>
          </Flex>
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList>
        <MenuItem
          fontSize="10pt"
          fontWeight={700}
          _hover={{ bg: "blue.500", color: "white" }}
        >
          <Flex align="center">
            <Icon fontSize={20} mr={2} as={HiOutlinePencil} />
            Blogs
          </Flex>
        </MenuItem>
        <MenuItem
          fontSize="10pt"
          fontWeight={700}
          _hover={{ bg: "blue.500", color: "white" }}
        >
          <Flex align="center">
            <Icon fontSize={20} mr={2} as={BsCameraVideo} />
            Videos
          </Flex>
        </MenuItem>
        <MenuItem
          fontSize="10pt"
          fontWeight={700}
          _hover={{ bg: "blue.500", color: "white" }}
        >
          <Flex align="center">
            <Icon fontSize={20} mr={2} as={AiOutlineQuestionCircle} />
            Help Center
          </Flex>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ResourceMenu;
