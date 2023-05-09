import React, { ReactNode } from "react";
import { Flex, FlexProps, Icon, Link, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { useRouter } from "next/router";
import { Workspace } from "@/src/atoms/workspacesAtom";

interface NavItemProps extends FlexProps {
  icon: IconType;
  name: string;
  link: string;
  workspace: Workspace;
}

const NavItem = ({ icon, name, link, workspace }: NavItemProps) => {
  const router = useRouter();

  return (
    <Flex
      align="center"
      onClick={() => router.push(`/workspace/${workspace.id}/${link}`)}
      p="2"
      mx="4"
      borderRadius="lg"
      role="group"
      cursor="pointer"
      _hover={{
        bg: "#404040",
        color: "white",
      }}
    >
      {icon && (
        <Icon
          mr="4"
          fontSize="16"
          _groupHover={{
            color: "white",
          }}
          as={icon}
        />
      )}
      <Text fontSize={13} color="gray.300">
        {name}
      </Text>
    </Flex>
  );
};

export default NavItem;
