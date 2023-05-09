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
  Button,
  Icon,
  HStack,
  Center,
} from "@chakra-ui/react";
import {
  FiHome,
  FiEdit2,
  FiSettings,
  FiCodepen,
  FiTarget,
  FiBookOpen,
  FiCalendar
} from "react-icons/fi";
import { IoAddCircleOutline } from 'react-icons/io5'
import { IconType } from "react-icons";
import NavItem from "./NavItem";
import Directory from "../Navbar/Directory/Directory";
import { useRecoilValue } from "recoil";
import { workspaceState } from "@/src/atoms/workspacesAtom";
import { HiLightningBolt } from "react-icons/hi"

interface LinkItemProps {
  name: string;
  icon: IconType;
  link: string;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome, link: "home" },
  { name: "Create Content", icon: FiEdit2, link: "create-content" },
  { name: "Content Strategy", icon: FiCodepen, link: "content-strategy" },
  { name: "Campaign Strategy", icon: FiTarget, link: "campaign-strategy" },
  { name: "Library", icon: FiBookOpen, link: "library" },
  { name: "Calendar", icon: FiCalendar, link: "calendar" },
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
      <Box
        textAlign="center"
        mt={8}
        pb={3}
        pt={3}
        bg={useColorModeValue("white", "#191A1D")}
        borderRadius={10}
        w={230}
        ml={5}
      >
        <Center>
          <HStack>
            <Icon as={HiLightningBolt} color="#915EFF"/>
            <Text fontSize="10pt">Activate Super</Text>
          </HStack>
        </Center>
        <Text pl={3} mb={1} fontSize="8pt" fontWeight={500} color="gray.500">Unlock all features of Think Content</Text>
        <Text fontSize="10pt">1583/10,000 Tokens Used</Text> 
        <Button width="75%" leftIcon={<IoAddCircleOutline />}>Upgrade</Button>
      </Box>
    </Box>
  );
};
