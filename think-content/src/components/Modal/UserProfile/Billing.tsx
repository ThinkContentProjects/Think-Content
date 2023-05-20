import { CheckIcon, ChevronDownIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  Icon,
  MenuDivider,
  Text,
  Switch,
  useColorMode,
  useColorModeValue,
  Box,
  Input,
  Button,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Divider,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { signOut, User } from "firebase/auth";
import React, { useState } from "react";
import { FaCheckCircle, FaUser } from "react-icons/fa";
import { CiLogin, CiLogout, CiUser, CiUnlock } from "react-icons/ci";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { useRouter } from "next/router";
import { authModalState } from "@/src/atoms/authModalAtom";
import { workspaceState } from "@/src/atoms/workspacesAtom";
import { auth } from "@/src/firebase/firebase";
import { BsFillMoonFill } from "react-icons/bs";
import CreateProfileModal from "./CreateProfileModal";
import { IoIosMap } from "react-icons/io";
import { TbTrash } from "react-icons/tb";
import { RiFileList3Line } from "react-icons/ri";
import { FiActivity, FiLayers, FiPackage } from "react-icons/fi";
import { SlCreditCard } from "react-icons/sl";
import { BiCreditCard } from "react-icons/bi";
import CreatePricingPlanModal from "../PricingPlan/CreatePricingPlanModal";

type BillingProps = {
    user?: User | null;
  };

const Billing: React.FC<BillingProps> = ({ user }) => {
    const [openPricingPlan, setOpenPricingPlan] = useState(false);
    return (
        <>        
            <CreatePricingPlanModal open={openPricingPlan} handleClose={() => setOpenPricingPlan(false)} />
            <Flex flexDir={"column"}>
                <Box position="relative" ml={-2}>
                <Text fontSize="xl" fontWeight="bold">
                    Billing Details
                </Text>
                <Box
                    position="absolute"
                    bottom="-4px" // Adjust this value to move the underline further below
                    left={0}
                    right={0}
                    height="0.5px"
                    bg="white" // Customize the underline color
                    w="32"
                />
                </Box>
                <Flex flexDir={"row"}>
                    <Box width="75%">
                        <Text ml={-2} pt={"16"} pb={4} fontSize={"sm"} fontWeight={"bold"}>
                            Payment Method
                        </Text>
                        <InputGroup>
                            <InputLeftElement
                            pointerEvents='none'
                            color='gray.300'
                            fontSize='1.0em'
                            >
                                <Box 
                                    borderRadius={"md"}
                                    h={6}
                                    w={6}
                                    placeholder='Last Name' 
                                    textColor="#959697"
                                    bgColor={"#414345"}
                                    ringColor={"#242628"}
                                    _hover={{color:"red.500"}}
                                >
                                    <Flex align="center" justify="center" h="100%">
                                        <Icon as={BiCreditCard} color={"#959697"} boxSize={3}/>
                                    </Flex>
                                </Box>
                            </InputLeftElement>
                            <Box width="full">
                                <Box 
                                    borderRadius={"lg"}
                                    fontSize={"xs"}
                                    placeholder='Last Name' 
                                    textColor="#959697"
                                    bgColor={"#242628"}
                                    ringColor={"#242628"}
                                    
                                >
                                    <Text py={2} px={10} fontSize={"sm"} h={"-moz-min-content"}>
                                        **** **** **** 7896    
                                    </Text>
                                </Box>
                            </Box>
                            <InputRightElement>
                                <Icon as={TbTrash} color='red.600' _hover={{color: "red.500"}}/>
                            </InputRightElement>
                        </InputGroup>
                    </Box>
                    <Box flex={"1"} ml={-10} mt={14}>
                        <Button 
                            w="-moz-min-content"
                            variant={"unstyled"}
                            fontSize={"xx-small"}
                            fontWeight={"normal"}
                            px={6}
                            py={2}
                            h="-moz-min-content"
                            color="gray.400" 
                            bg="#242628"
                            _hover={{ color: 'white', bg: "#242628"}}
                            //On-Click Action Needed Here
                        >
                            Add a New Card
                        </Button>
                    </Box>
                </Flex>
                <Flex flexDir={"row"}>
                <Box width="75%">
                        <Text ml={-2} pt={"10"} pb={4} fontSize={"sm"} fontWeight={"bold"}>
                            Current Plan
                        </Text>
                        <InputGroup>
                            <InputLeftElement
                            pointerEvents='none'
                            color='gray.300'
                            fontSize='1.0em'
                            >
                                <Box 
                                    borderRadius={"md"}
                                    h={6}
                                    w={6}
                                    placeholder='Last Name' 
                                    textColor="#959697"
                                    bgColor={"#414345"}
                                    ringColor={"#242628"}
                                >
                                    <Flex align="center" justify="center" h="100%">
                                        <Icon as={FiActivity} color={"#959697"} boxSize={3}/>
                                    </Flex>
                                </Box>
                            </InputLeftElement>
                            <Box width="full">
                                <Box 
                                    borderRadius={"lg"}
                                    fontSize={"xs"}
                                    placeholder='Last Name' 
                                    textColor="#959697"
                                    bgColor={"#242628"}
                                    ringColor={"#242628"}
                                >
                                    <Text py={2} px={10} fontSize={"sm"} h={"-moz-min-content"}>
                                        Basic Plan    
                                    </Text>
                                </Box>
                            </Box>
                        </InputGroup>
                    </Box>
                    <Box flex={"1"} ml={-10} mt={8}>
                        <Button 
                            w="-moz-min-content"
                            variant={"unstyled"}
                            fontSize={"xx-small"}
                            fontWeight={"normal"}
                            px={6}
                            py={2}
                            h="-moz-min-content"
                            color="gray.400" 
                            bg="#242628"
                            _hover={{ color: 'white', bg: "#242628"}}
                            onClick={() => setOpenPricingPlan(true)}
                        >
                            Change Plan
                        </Button>
                    </Box>
                </Flex>
                <Text pt={10} ml={-2}  fontSize={"sm"}>
                    Billing History  
                </Text>
                <Text py={4} ml={-2}  textColor="#959697" fontSize={"xs"}>
                    Next billing cycle start 6/07/2023  
                </Text>
                <Flex width="65%" flexDir={"column"}>
                    
                    <Flex flexDir={"row"} justify="space-between" pb={2}>
                        <Text textColor="white" fontSize={"s"}>
                            Amount
                        </Text>
                        <Text textColor="white" fontSize={"s"}>
                            card
                        </Text>
                        <Text textColor="white" fontSize={"s"}>
                            Date
                        </Text>
                        <Text textColor="white">
                            Status
                        </Text>
                    </Flex>
                    <Divider borderWidth={2}/>
                    <Flex flexDir={"row"}  justify="space-between"  py={4}>
                        <Text pl={2} textColor="#959697" fontSize={"xs"}>
                            $15.00  
                        </Text>  
                        <Text textColor="#959697" fontSize={"xs"}>
                            Ending in 7896   
                        </Text> 
                        <Text textColor="#959697" fontSize={"xs"}>
                            5/07/2023 5:32 PM 
                        </Text> 
                        <Text textColor="#959697" fontSize={"xs"}>
                            Successful
                        </Text> 
                    </Flex>
                    <Flex flexDir={"row"}  justify="space-between" py={4}>
                        <Text  pl={2} textColor="#959697" fontSize={"xs"}>
                            $15.00  
                        </Text>  
                        <Text textColor="#959697" fontSize={"xs"}>
                            Ending in 7896   
                        </Text> 
                        <Text textColor="#959697" fontSize={"xs"}>
                            5/07/2023 5:32 PM 
                        </Text> 
                        <Text textColor="#959697" fontSize={"xs"}>
                            Successful
                        </Text> 
                    </Flex>
                </Flex>
            </Flex>
            
        </>
    );

};

export default Billing;