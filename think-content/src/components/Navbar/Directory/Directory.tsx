import { defaultMenuItem } from "@/src/atoms/directoryMenuAtom";
import useDirectory from "@/src/hooks/useDirectory";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  Menu,
  MenuButton,
  MenuList,
  Text,
  useColorModeValue,
  Square,
} from "@chakra-ui/react";
import React from "react";
import Workspaces from "./Workspaces";

const Directory: React.FC = () => {
  const { directoryState, ToggleMenuOpen } = useDirectory();
  const bg = useColorModeValue("blackAlpha.300", "#575757");

  return (
    <Menu isOpen={directoryState.isOpen}>
      <MenuButton
        cursor="pointer"
        bg={bg}
        padding="0px 6px"
        borderRadius={8}
        mr={2}
        ml={{ base: 0, md: 2 }}
        _hover={{ outline: "1px solid", outlineColor: "grey.200" }}
        onClick={ToggleMenuOpen}
      >
        <Flex
          align="center"
          justify="space-between"
          width={{ base: "auto", lg: "200px" }}
        >
          <Flex align="center">
            <Square size="20px" borderRadius="2" outline="1px solid" fontWeight="600" ml={1}>
              {directoryState.selectedMenuItem.displayText[0].toUpperCase()}
            </Square>
            <Text fontWeight={600} ml={3} fontSize="12pt">
              {directoryState.selectedMenuItem.displayText}
            </Text>
          </Flex>
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList>
        <Workspaces />
      </MenuList>
    </Menu>
  );
};

export default Directory;
