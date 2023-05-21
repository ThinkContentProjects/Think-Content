import { auth } from "@/src/firebase/firebase";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Box,
  Text,
  Flex,
  Button,
  ModalCloseButton} from "@chakra-ui/react";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import "react-tabs/style/react-tabs.css";
import { Icon } from '@chakra-ui/react'
import { BsCheckCircleFill } from "react-icons/bs";
import { RiAliensLine, RiSkull2Line, RiSkullLine } from "react-icons/ri";

type CreatePricingPlanModalProps = {
    open: boolean;
    handleClose: () => void;
  };

const CreatePricingPlanModal: React.FC<CreatePricingPlanModalProps> = ({
  open,
  handleClose
}) => {
    const [user] = useAuthState(auth);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [currentPlan, setCurrentPlan] = useState(0);

    const handleCreateWorkspace = async () => {
        if (error) setError("");
        setLoading(false);
    };
    return (
        <>
            <Modal isOpen={open} onClose={handleClose} size="5xl">
                <ModalOverlay/>
                <ModalContent borderRadius="3xl" pt={4} px={4}>
                <ModalCloseButton />
                    <ModalBody mt={8}>
                        <Flex flexDir={"row"} justify={"space-evenly"} mb={-2}>
                            <Box w={"30%"} h={"xl"} bg={currentPlan=== 1 ?"#1C1E20": ""} borderRadius={"lg"}>
                                <Flex flexDir={"column"} px={4}>
                                    <Flex flexDir={"row"} justify={"start"} py={2}>
                                        <Icon as={RiSkullLine} boxSize={10} mr={4}/>
                                        <Text fontSize={"3xl"} fontWeight={"bold"}color={"white"}>Basic</Text>
                                    </Flex>
                                    <Flex alignItems="start" py={4} px={2}>
                                        <Text color={"#525355"} fontSize={"lg"}>What You'll Get</Text>
                                    </Flex>
                                    <Flex flexDir={"row"} justify={"start"} py={2}>
                                        <Icon as={BsCheckCircleFill} my={1} mx={2} boxSize={4}/>
                                        <Text color={"#D8D9D9"} fontSize={"sm"}>
                                            Up to 10,000 tokens/month
                                        </Text>
                                    </Flex>
                                    <Flex flexDir={"row"} justify={"start"} py={2}>
                                        <Icon as={BsCheckCircleFill} my={1} mx={2} boxSize={4}/>
                                        <Text color={"#D8D9D9"} fontSize={"sm"}>
                                            Access to all features
                                        </Text>
                                    </Flex>
                                    <Flex flexDir={"row"} justify={"start"} py={2}>
                                        <Icon as={BsCheckCircleFill} my={1} mx={2} boxSize={4}/>
                                        <Text color={"#D8D9D9"} fontSize={"sm"}>
                                            1 Workspace
                                        </Text>
                                    </Flex>
                                    <Flex mt={"120px"} justifyContent="center" alignItems="start" height="100%" py={4}>
                                        <Box
                                            borderWidth="1px"
                                            borderStyle="dashed"
                                            borderColor="#383A3C"
                                            width="90%"
                                            height="1px"
                                        />
                                    </Flex>
                                    <Flex alignItems="start" p={4}>
                                        <Text fontSize={"2xl"} fontWeight={"bold"}color={"white"}>$25</Text><Text color={"#D8D9D9"} fontSize={"sm"} my={2.5}>/month</Text>
                                    </Flex>
                                </Flex>
                                <Flex flexDir={"row"} justify={"start"} px={6} py={4} style={{ visibility: currentPlan === 0 ? "visible" : "hidden" }}>
                                    <Icon as={BsCheckCircleFill} my={1} mx={2} boxSize={4} color={"green.500"}/>
                                    <Text color={"#D8D9D9"} fontSize={"sm"}
                                    >
                                        Free 2-Week Trial
                                    </Text>
                                </Flex>
                                <Flex justify={"center"} w={"100%"} pl={8}>
                                    <Button
                                        w={"full"}
                                        bg={currentPlan === 1 ? "#FA00CC": "white"} 
                                        textColor={currentPlan === 1 ? "#white": "#FA00CC"}
                                        style={{
                                            boxShadow:currentPlan === 1 ? "0 0 10px #FA00CC": ""
                                        }}
                                        _hover={{bg:"#FA00CC", textColor:"white", boxShadow: "0 0 10px #FA00CC"}}
                                        onClick={() => setCurrentPlan(1)}
                                        transition="box-shadow textColor bg 0.3s ease"
                                    >
                                        <Box>
                                            {currentPlan === 1 && <Text >Current Plan</Text>}
                                            {currentPlan != 1 && <Text >Choose</Text>}
                                        </Box>
                                        
                                        
                                    </Button>
                                </Flex>
                            </Box>
                            <Box w={"30%"}  h={"xl"} borderRadius={"lg"} bg={currentPlan=== 2 ?"#1C1E20": ""}>
                                <Flex flexDir={"column"} px={4}>
                                    <Flex flexDir={"row"} justify={"start"} py={2}>
                                        <Icon as={RiSkull2Line} boxSize={10} mr={4}/>
                                        <Text fontSize={"3xl"} fontWeight={"bold"}color={"white"}>Growth</Text>
                                    </Flex>
                                    <Flex alignItems="start" py={4} px={2}>
                                        <Text color={"#525355"} fontSize={"lg"}>What You'll Get</Text>
                                    </Flex>
                                    <Flex flexDir={"row"} justify={"start"} py={2}>
                                        <Icon as={BsCheckCircleFill} my={1} mx={2} boxSize={4}/>
                                        <Text color={"#D8D9D9"} fontSize={"sm"}>
                                            Up to 30,000 tokens/month
                                        </Text>
                                    </Flex>
                                    <Flex flexDir={"row"} justify={"start"} py={2}>
                                        <Icon as={BsCheckCircleFill} my={1} mx={2} boxSize={4}/>
                                        <Text color={"#D8D9D9"} fontSize={"sm"}>
                                            Access to all features
                                        </Text>
                                    </Flex>
                                    <Flex flexDir={"row"} justify={"start"} py={2}>
                                        <Icon as={BsCheckCircleFill} my={1} mx={2} boxSize={4}/>
                                        <Text color={"#D8D9D9"} fontSize={"sm"}>
                                            3 Workspaces
                                        </Text>
                                    </Flex>
                                    <Flex flexDir={"row"} justify={"start"} py={2}>
                                        <Icon as={BsCheckCircleFill} my={1} mx={2} boxSize={4}/>
                                        <Text color={"#D8D9D9"} fontSize={"sm"}>
                                            5 Team members
                                        </Text>
                                    </Flex>
                                    <Flex flexDir={"row"} justify={"start"} py={2}>
                                        <Icon as={BsCheckCircleFill} my={1} mx={2} boxSize={4}/>
                                        <Text color={"#D8D9D9"} fontSize={"sm"}>
                                            Advanced analytics
                                        </Text>
                                    </Flex>
                                    <Flex mt={10} justifyContent="center" alignItems="start" height="100%" py={4}>
                                        <Box
                                            borderWidth="1px"
                                            borderStyle="dashed"
                                            borderColor="#383A3C"
                                            width="100%"
                                            height="1px"
                                        />
                                    </Flex>
                                    <Flex alignItems="start" p={4}>
                                        <Text fontSize={"2xl"} fontWeight={"bold"}color={"white"}>$50</Text><Text color={"#D8D9D9"} fontSize={"sm"} my={2.5}>/month</Text>
                                    </Flex>
                                </Flex>
                                <Flex flexDir={"row"} justify={"start"} px={6} py={4} style={{ visibility: currentPlan === 0 ? "visible" : "hidden" }}>
                                    <Icon as={BsCheckCircleFill} my={1} mx={2} boxSize={4} color={"green.500"}/>
                                    <Text color={"#D8D9D9"} fontSize={"sm"}
                                    >
                                        Free 2-Week Trial
                                    </Text>
                                </Flex>
                                <Flex justify={"center"} w={"100%"} pl={8}>
                                    <Button
                                        w={"full"}
                                        bg={currentPlan === 2 ? "#FA00CC": "white"} 
                                        textColor={currentPlan === 2 ? "#white": "#FA00CC"}
                                        style={{
                                            boxShadow:currentPlan === 2 ? "0 0 10px #FA00CC": ""
                                        }}
                                        _hover={{bg:"#FA00CC", textColor:"white", boxShadow: "0 0 10px #FA00CC"}}
                                        onClick={() => setCurrentPlan(2)}
                                        transition="box-shadow textColor bg 0.3s ease"
                                    >
                                        <Box>
                                            {currentPlan === 2 && <Text >Current Plan</Text>}
                                            {currentPlan != 2 && <Text >Choose</Text>}
                                        </Box>
                                        
                                        
                                    </Button>
                                </Flex>
                            </Box>
                            <Box w={"30%"}  h={"xl"} borderRadius={"lg"} bg={currentPlan=== 3 ?"#1C1E20": ""}>
                            <Flex flexDir={"column"} px={4}>
                                    <Flex flexDir={"row"} justify={"start"} py={2}>
                                        <Icon as={RiAliensLine} boxSize={10} mr={4}/>
                                        <Text fontSize={"3xl"} fontWeight={"bold"}color={"white"}>Pro</Text>
                                    </Flex>
                                    <Flex alignItems="start" py={4} px={2}>
                                        <Text color={"#525355"} fontSize={"lg"}>What You'll Get</Text>
                                    </Flex>
                                    <Flex flexDir={"row"} justify={"start"} py={2}>
                                        <Icon as={BsCheckCircleFill} my={1} mx={2} boxSize={4}/>
                                        <Text color={"#D8D9D9"} fontSize={"sm"}>
                                            Unlimited tokens/month
                                        </Text>
                                    </Flex>
                                    <Flex flexDir={"row"} justify={"start"} py={2}>
                                        <Icon as={BsCheckCircleFill} my={1} mx={2} boxSize={4}/>
                                        <Text color={"#D8D9D9"} fontSize={"sm"}>
                                            Access to all features
                                        </Text>
                                    </Flex>
                                    <Flex flexDir={"row"} justify={"start"} py={2}>
                                        <Icon as={BsCheckCircleFill} my={1} mx={2} boxSize={4}/>
                                        <Text color={"#D8D9D9"} fontSize={"sm"}>
                                            Unlimited Workspaces
                                        </Text>
                                    </Flex>
                                    <Flex flexDir={"row"} justify={"start"} py={2}>
                                        <Icon as={BsCheckCircleFill} my={1} mx={2} boxSize={4}/>
                                        <Text color={"#D8D9D9"} fontSize={"sm"}>
                                            10 Team members
                                        </Text>
                                    </Flex>
                                    <Flex flexDir={"row"} justify={"start"} py={2}>
                                        <Icon as={BsCheckCircleFill} my={1} mx={2} boxSize={4}/>
                                        <Text color={"#D8D9D9"} fontSize={"sm"}>
                                            Advanced analytics
                                        </Text>
                                    </Flex>
                                    <Flex flexDir={"row"} justify={"start"} py={2}>
                                        <Icon as={BsCheckCircleFill} my={1} mx={2} boxSize={4}/>
                                        <Text color={"#D8D9D9"} fontSize={"sm"}>
                                            24/7 support
                                        </Text>
                                    </Flex>
                                    <Flex justifyContent="center" alignItems="start" height="100%" py={4}>
                                        <Box
                                            borderWidth="1px"
                                            borderStyle="dashed"
                                            borderColor="#383A3C"
                                            width="90%"
                                            height="1px"
                                        />
                                    </Flex>
                                    <Flex alignItems="start" p={4}>
                                        <Text fontSize={"2xl"} fontWeight={"bold"}color={"white"}>$75</Text><Text color={"#D8D9D9"} fontSize={"sm"} my={2.5}>/month</Text>
                                    </Flex>
                                </Flex>
                                <Flex flexDir={"row"} justify={"start"} px={6} py={4} style={{ visibility: currentPlan === 0 ? "visible" : "hidden" }}>
                                    <Icon as={BsCheckCircleFill} my={1} mx={2} boxSize={4} color={"green.500"}/>
                                    <Text color={"#D8D9D9"} fontSize={"sm"}
                                    >
                                        Free 2-Week Trial
                                    </Text>
                                </Flex>
                                <Flex justify={"center"} w={"100%"} pl={8}
                                
                                >
                                    <Button
                                        w={"full"}
                                        bg={currentPlan === 3 ? "#FA00CC": "white"} 
                                        textColor={currentPlan === 3 ? "#white": "#FA00CC"}
                                        style={{
                                            boxShadow:currentPlan === 3 ? "0 0 10px #FA00CC": ""
                                        }}
                                        _hover={{bg:"#FA00CC", textColor:"white", boxShadow: "0 0 10px #FA00CC"}}
                                        onClick={() => setCurrentPlan(3)}
                                        transition="box-shadow textColor bg 0.3s ease"
                                    >
                                        <Box>
                                            {currentPlan === 3 && <Text >Current Plan</Text>}
                                            {currentPlan != 3 && <Text >Choose</Text>}
                                        </Box>
                                        
                                        
                                    </Button>
                                </Flex>
                               
                            </Box>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default CreatePricingPlanModal