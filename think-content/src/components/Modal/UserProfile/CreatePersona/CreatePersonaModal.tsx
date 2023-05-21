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
  Tabs,
  Flex,
  Image
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
import { MdAccountCircle, MdAttachMoney, MdOutlinePayments, MdWorkspacesOutline } from 'react-icons/md'
import { TbBrandAsana, TbReceipt2 } from "react-icons/tb";
import { CloseIcon } from "@chakra-ui/icons";
import { FaMoneyBillAlt } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi2";



type CreateNewPersonaModalProps = {
    open: boolean;
    handleClose: () => void;
  };

const CreateNewPersonaModal: React.FC<CreateNewPersonaModalProps> = ({
  open,
  handleClose
}) => {
    const [user] = useAuthState(auth);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [gender, setGender] = useState(0);

    const handleCreateWorkspace = async () => {
        if (error) setError("");
        setLoading(false);
    };

    

    return (
        <>
            <Modal isOpen={open} onClose={handleClose} size="xl">
                <ModalOverlay/>
                <ModalContent borderRadius={"2xl"} p={4}>
                    <ModalHeader>
                        
                    </ModalHeader>
                    <ModalBody>
                            <ModalCloseButton />
                            <Flex flexDirection={"row"} >
                                <Flex flexDir={"column"}>
                                    <Image
                                        src="/images/darkerBgWomanProfile.PNG"
                                        h="175px"
                                    />
                                    <Button 
                                        variant={"unstyled"}
                                        fontSize={"xs"}
                                        color={"#959697"}
                                        fontWeight={"semibold"}
                                    >
                                        change image
                                    </Button>
                                </Flex>
                                <Flex flexDir={"column"} w={"50%"} alignContent={"flex-end"}>
                                    <Text fontSize="md" color={"white"} mt={14} mb={4} ml={8} fontWeight={"semibold"}>
                                        Persona Name
                                    </Text>
                                    <Input variant={"filled"} placeholder={"Young Females"} w={"70%"}>
                                    </Input>
                                    <Text fontSize="md" color={"white"} mt={8} mb={4} fontWeight={"semibold"}>
                                        Gender
                                    </Text>
                                    <Flex flexDir={'row'} h={"-moz-min-content"} justify={"space-evenly"} w={"80%"} justifyContent={"center"}>
                                        <Button variant={"unstyled"} bg={"#242628"} h={6} w={24} fontSize={"xs"} mx={2}>
                                            male
                                        </Button>                                   
                                        <Button variant={"unstyled"} bg={"#242628"} h={6} w={24} fontSize={"xs"}  mx={2}>
                                            female
                                        </Button> 
                                        <Button variant={"unstyled"} bg={"#242628"} h={6} w={24} fontSize={"xs"}  mx={2}>
                                            other
                                        </Button>
                                    </Flex>
                                    
                                </Flex>
                                
                            </Flex>
                    </ModalBody>
                    <ModalFooter>
                        <Button 
                            fontSize={"xs"}
                            fontWeight={"normal"}
                            px={6}
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

export default CreateNewPersonaModal