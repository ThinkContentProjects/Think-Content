import useDirectory from "@/src/hooks/useDirectory";
import {
  Flex,
  MenuItem,
  Square,
  Text,
} from "@chakra-ui/react";
import React from "react";

type MenuListItemProps = {
  displayText: string;
  link: string;
};

const MenuListItem: React.FC<MenuListItemProps> = ({ displayText, link }) => {
  const { onSelectMenuItem } = useDirectory();

  return (
    <MenuItem
      width="100%"
      fontSize="10pt"
      onClick={() =>
        onSelectMenuItem({
          displayText,
          link,
        })
      }
    >
      <Flex align="center">
        <Square size="32px" borderRadius="7" bg="#2589FF" fontWeight="600">
          {displayText[0].toUpperCase()}
        </Square>
        <Text mr={3} ml={3} fontSize={15}>
          {displayText}
        </Text>
      </Flex>
    </MenuItem>
  );
};

export default MenuListItem;
