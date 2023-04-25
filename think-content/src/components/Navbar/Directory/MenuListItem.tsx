import useDirectory from "@/src/hooks/useDirectory";
import { Flex, Icon, Image, MenuItem, Text } from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";

type MenuListItemProps = {
  displayText: string;
  link: string;
  icon: IconType;
  imageURL?: string;
};

const MenuListItem: React.FC<MenuListItemProps> = ({
  displayText,
  link,
  icon,
  imageURL,
}) => {
  const { onSelectMenuItem } = useDirectory();

  return (
    <MenuItem
      width="100%"
      fontSize="10pt"
      onClick={() =>
        onSelectMenuItem({
          displayText,
          link,
          icon,
          imageURL,
        })
      }
    >
      <Flex align="center">
        {imageURL ? (
          <Image src={imageURL} borderRadius="full" boxSize="18px" mr={2} />
        ) : (
          <Icon as={icon} fontSize={20} mr={2}/>
        )}
        <Text mr={3}>{displayText}</Text>
      </Flex>
    </MenuItem>
  );
};

export default MenuListItem;
