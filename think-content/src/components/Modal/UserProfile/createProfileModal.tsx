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
import { TbBrandAsana } from "react-icons/tb";



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
      <Modal isOpen={open} onClose={handleClose} size="xl">
        <ModalOverlay />
        <ModalContent>
        <ModalHeader>Profile Settings</ModalHeader>
        <ModalBody>
          <Tabs variant='soft-rounded' size="sm" width="128">
            <Box display="flex">
              <Box width="25%" bg='#1E2022' fontSize="xs" mx="auto" 
                borderRadius={10}
                w={200}
                ml={5}
              >
                <TabList
                  flexDirection="column"
                  alignItems="flex-start"
                  width="100%"
                >
                  <Tab
                    color="#959697"
                    _selected={{ color: 'white', bg: '#242628'}}
                    width="100%"
                    justifyContent="flex-start"
                    paddingLeft="1rem"
                  >
                    <Icon as={MdAccountCircle}/>
                    Account Information
                  </Tab>
                  <Tab
                    color="#959697"
                    _selected={{ color: 'white', bg: '#242628'}}
                    width="100%"
                    justifyContent="flex-start"
                    paddingLeft="1rem"
                  >
                    <Icon as={MdAttachMoney} boxSize={4}/>
                    Billing
                  </Tab>
                  <Tab
                    color="#959697"
                    _selected={{ color: 'white', bg: '#242628'}}
                    width="100%"
                    justifyContent="flex-start"
                    paddingLeft="1rem"
                  >
                    <Icon as={TbBrandAsana} boxSize={4}/>
                    Brand Profiles
                  </Tab>
                </TabList>
              </Box>
              <Box flex="1">
                <TabPanels>
                  <TabPanel>
                    <Text fontSize="xl" textDecoration="underline">Account Information</Text>
                  </TabPanel>
                  <TabPanel>
                    <Text fontSize="xl" textDecoration="underline">Billings</Text>
                  </TabPanel>
                  <TabPanel>
                    <Text fontSize="xl" textDecoration="underline">Brand Profiles</Text>
                  </TabPanel>
                </TabPanels>
              </Box>
            </Box>
          </Tabs> 
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" onClick={ ()=> handleClose}>Save Changes</Button>
        </ModalFooter>
        </ModalContent>
      </Modal>
    </>
    );
};

export default CreateProfileModal;