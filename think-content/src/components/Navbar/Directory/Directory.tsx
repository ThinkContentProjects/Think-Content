import { defaultMenuItem } from "@/src/atoms/directoryMenuAtom";
import useDirectory from "@/src/hooks/useDirectory";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  Text,
  Image,
  useColorModeValue,
  Stack,
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
            {directoryState.selectedMenuItem.imageURL ? (
              <Image
                src={directoryState.selectedMenuItem.imageURL}
                borderRadius="full"
                boxSize="24px"
                mr={2}
              />
            ) : (
              <Icon
                fontSize={24}
                mr={{ base: 1, md: 2 }}
                as={directoryState.selectedMenuItem.icon}
                color={directoryState.selectedMenuItem.iconColor}
              ></Icon>
            )}
            <Flex display={{ base: "none", lg: "flex" }} direction="column">
              <Text fontWeight={600} fontSize="12pt">
                {directoryState.selectedMenuItem.displayText}
              </Text>
              {directoryState.selectedMenuItem != defaultMenuItem && (
                <Text fontWeight={600} ml={-9} fontSize="8pt">
                  {directoryState.selectedMenuItem.numMembers}
                  {directoryState.selectedMenuItem.numMembers == 1
                    ? " member"
                    : " members"}
                </Text>
              )}
            </Flex>
          </Flex>
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList
        _dark={{
          "--menu-bg": "#282828",
        }}
      >
        <Workspaces />
      </MenuList>
    </Menu>
  );
};

export default Directory;
