import { AddIcon, ChevronDownIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  Text,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
  Box,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import path from "path";

interface FeaturesMenuProps {
  scrollToSection: (sectionId: string) => void;
}



const FeaturesMenu: React.FC<FeaturesMenuProps> = ({ scrollToSection }) => {
  const router = useRouter();
  const [sectionId, setSectionId] = useState('overview');

  const handleClick = (sectionId: string) => {
    if (router.pathname !== '/') {
      router.push('/');
    }

    // Use a setTimeout to scroll after the route change has occurred
    setTimeout(() => {
      scrollToSection(sectionId);
    }, 0);
  };

  useEffect(() => {
    // Scroll to the section if the URL contains a section hash
    if (router.pathname !=="/") {
      scrollToSection(sectionId);
    }
  }, [router, scrollToSection]);


  return (
    <Menu >
      <MenuButton
        cursor="pointer"
        mr={4}
        padding="0px 6px"
        borderRadius={4}
        _hover={{ bg: "purple.100", color: "purple.600" }}
      >
        <Flex align="center" display={{ base: "none", md: "flex" }}>
          <Flex align="center"> 
            <Text fontWeight={700} fontSize="12pt">
              Features
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
          onClick={() => {
            setSectionId("overview");
            handleClick("overview");
          }}
        >
          <Flex align="center">
            Overview
          </Flex>
        </MenuItem>
        <MenuItem
          fontSize="11pt"
          fontWeight={500}
          _hover={{ bg: "purple.600", color: "white" }}
          onClick={() => {
            setSectionId("content");
            handleClick("content");
          }}
        >
          <Flex align="center">
            Content Strategy
          </Flex>
        </MenuItem>
        <MenuItem
          fontSize="11pt"
          fontWeight={500}
          _hover={{ bg: "purple.600", color: "white" }}
          onClick={() => {
            setSectionId("creation");
            handleClick("creation");
          }}
        >
          <Flex align="center">
            Content Creation
          </Flex>
        </MenuItem>
        <MenuItem
          fontSize="11pt"
          fontWeight={500}
          _hover={{ bg: "purple.600", color: "white" }}
          onClick={() => {
            setSectionId("campaign");
            handleClick("campaign");
          }}
        >
          <Flex align="center">
            Campaign Strategy
          </Flex>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default FeaturesMenu;
