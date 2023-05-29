import React, { ReactNode } from "react";
import { Flex, FlexProps, Icon, Link, Text, useColorModeValue } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { useRouter } from "next/router";
import { Workspace } from "@/src/atoms/workspacesAtom";

interface NavItemProps extends FlexProps {
  icon: IconType;
  name: string;
  link: string;
  workspace: Workspace | undefined;
}

const NavItem = ({ icon, name, link, workspace }: NavItemProps) => {
  const router = useRouter();
  const nav_hover_bg = useColorModeValue("gray.100", "#27282A");

  return (
    <Flex
      align="center"
      onClick={() => router.push(`/workspace/${workspace?.id}/${link}`)}
      p="2"
      mx="4"
      borderRadius="lg"
      role="group"
      cursor="pointer"
      _hover={{
        bg: nav_hover_bg,
      }}
    >
      {icon && (
        <Icon
          mr="4"
          fontSize="16"
          as={icon}
        />
      )}
      <Text fontSize={13} >
        {name}
      </Text>
    </Flex>
  );
};

export default NavItem;