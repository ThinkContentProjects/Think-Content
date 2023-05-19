import { auth, db } from "@/src/firebase/firebase";
import useWorkspaceData from "@/src/hooks/useWorkspaceData";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  Divider,
  Text,
  Input,
  Select,
  useColorModeValue,
  useToast,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from "@chakra-ui/react";
import {
  collection,
  doc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import "react-tabs/style/react-tabs.css";
import { Icon } from '@chakra-ui/react'
import { MdAccountCircle, MdAttachMoney } from 'react-icons/md'
import { TbBrandAsana, TbReceipt2 } from "react-icons/tb";
import { CloseIcon } from "@chakra-ui/icons";
import AccountInformation from "./AccountInformation";
import Billing from "./Billing";
import BrandProfiles from "./BrandProfiles";
import { FaMoneyBillAlt } from "react-icons/fa";



type CreateProfileModalProps = {
    open: boolean;
    handleClose: () => void;
  };

const CreateProfileModal: React.FC<CreateProfileModalProps> = ({
  open,
  handleClose
}) => {
    const [user] = useAuthState(auth);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleCreateWorkspace = async () => {
        if (error) setError("");
        setLoading(false);
    };

    

    return (
    <>
      <Modal isOpen={open} onClose={handleClose} size="6xl">
        <ModalOverlay/>
        <ModalContent pl={8} pb={3} borderRadius="3xl" pt={4}>
        <ModalHeader fontSize={"2xl"}>
          Profile Settings
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody>
          <Tabs variant='soft-rounded' size="sm" width="128" pt={30}>
            <Box display="flex">
              <Box width="25%" bg='#1E2022' mx="auto" 
                w={200}
                mr={10}
                alignItems="flex-start"
                borderRadius="xl"
                h={"min"}
              >
                <TabList
                  flexDirection="column"
                  alignItems="flex-start"
                  width="100%"
                  
                >
                  <Tab
                    fontSize="14"
                    fontWeight={"thin"}
                    color="#959697"
                    _selected={{ color: 'white', bg: '#242628'}}
                    width="100%"
                    justifyContent="flex-start"
                    paddingLeft="1rem"
                  >
                    <Icon as={MdAccountCircle} boxSize={4} mr={2}/>
                    Account Information
                  </Tab>
                  <Tab
                    fontSize="14"
                    fontWeight={"thin"}
                    color="#959697"
                    _selected={{ color: 'white', bg: '#242628'}}
                    width="100%"
                    justifyContent="flex-start"
                    paddingLeft="1rem"
                  >
                    <Icon as={MdAttachMoney} boxSize={4} mr={2}/>
                    Billing
                  </Tab>
                  <Tab
                    fontSize="14"
                    fontWeight={"thin"}
                    color="#959697"
                    _selected={{ color: 'white', bg: '#242628'}}
                    width="100%"
                    justifyContent="flex-start"
                    paddingLeft="1rem"
                  >
                    <Icon as={TbBrandAsana} boxSize={4} mr={2}/>
                     Brand Profiles
                  </Tab>
                </TabList>
              </Box>
              <Box flex="1">
                <TabPanels 
                  alignItems="flex-start"
                  marginTop="-20"
                  marginLeft="16"
                >
                  <TabPanel>
                    <AccountInformation/>
                  </TabPanel>
                  <TabPanel>
                    <Billing/>
                  </TabPanel>
                  <TabPanel>
                    <BrandProfiles/>
                  </TabPanel>
                </TabPanels>
              </Box>
            </Box>
          </Tabs> 
        </ModalBody>
        <ModalFooter>
          <Button 
            fontSize={"xs"}
            fontWeight={"normal"}
            px={8}
            py={2}
            h="-moz-min-content"
            variant="unstyled" 
            color="#1E2022" 
            bg="#ffffff"
            _hover={{ color: 'black', bg: "gray.300"}}
            onClick={handleClose} //Need to update data once this button is clicked
          >
            Save Changes
          </Button>
        </ModalFooter>
        </ModalContent>
      </Modal>
    </>
    );
};

export default CreateProfileModal;