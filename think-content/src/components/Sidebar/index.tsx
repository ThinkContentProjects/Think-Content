import React, { ReactNode } from "react";
import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
} from "react-icons/fi";
import { IconType } from "react-icons";
import NavItem from "./NavItem";
import Directory from "../Navbar/Directory/Directory";
import { useRecoilValue } from "recoil";
import { workspaceState } from "@/src/atoms/workspacesAtom";

interface LinkItemProps {
  name: string;
  icon: IconType;
  link: string;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome, link: "home" },
  { name: "Create Content", icon: FiTrendingUp, link: "create-content" },
  { name: "Content Strategy", icon: FiCompass, link: "content-strategy" },
  { name: "Campaign Strategy", icon: FiStar, link: "campaign-strategy" },
  { name: "Library", icon: FiSettings, link: "library" },
  { name: "Calendar", icon: FiSettings, link: "calendar" },
  { name: "Settings", icon: FiSettings, link: "settings" },
];

export default function SimpleSidebar({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
    </>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const workspaceStateValue = useRecoilValue(workspaceState);
  return (
    <Box pos="fixed" h="full" {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Directory />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <Box
        pb={3}
        pt={3}
        bg={useColorModeValue("white", "#191A1D")}
        borderRadius={10}
        w={230}
        ml={5}
      >
        {LinkItems.map((link) => (
          <NavItem
            key={link.name}
            icon={link.icon}
            name={link.name}
            link={link.link}
            workspace={
              workspaceStateValue.currentWorkspace
            } /* This will fix once I get rid of dashboard*/
          >
            {link.name}
          </NavItem>
        ))}
      </Box>
    </Box>
  );
};
