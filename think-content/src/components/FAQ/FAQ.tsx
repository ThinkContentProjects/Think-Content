import useWorkspaceData from "@/src/hooks/useWorkspaceData";
import { AddIcon, ArrowForwardIcon, MinusIcon } from "@chakra-ui/icons";
import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Box, Button, Flex, Icon, Image, Text } from "@chakra-ui/react";
import { HiOutlineSparkles } from "react-icons/hi2";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../atoms/authModalAtom";
import Footer from "../Footer/Footer";

const FAQ: React.FC = () => 
{
    return (
        <>
            <Text pt={24} pb={8} fontSize={"4xl"} fontWeight={"bold"}>
                Frequently Asked Questions
            </Text>
            <Accordion allowMultiple justifyContent={"center"} w={"50%"}>
                <AccordionItem bg="#242628" borderRadius={"2xl"}my={4}>
                    {({ isExpanded }) => (
                    <>
                        <h2>
                        <AccordionButton>
                            <Box flex={"1"} w={"100%"} my={4} fontSize={"xl"} textAlign='left' bgColor={"#242628"}>
                            What is Think Content and how does it work?
                            </Box>
                            {isExpanded ? (
                            <MinusIcon fontSize='12px' color={"white"}/>
                            ) : (
                            <AddIcon fontSize='12px' color={"white"}/>
                            )}
                        </AccordionButton>
                        </h2>
                        <AccordionPanel pb={8} fontSize={"lg"} bg={"#121316"}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat.
                        </AccordionPanel>
                    </>
                    )}
                </AccordionItem>
                <AccordionItem bg="#242628" borderRadius={"2xl"}my={4}>
                    {({ isExpanded }) => (
                    <>
                        <h2>
                        <AccordionButton>
                            <Box flex={"1"} w={"100%"} my={4} fontSize={"xl"} textAlign='left' bgColor={"#242628"}>
                            How does Think Content help with content strategy?
                            </Box>
                            {isExpanded ? (
                            <MinusIcon fontSize='12px' color={"white"}/>
                            ) : (
                            <AddIcon fontSize='12px' color={"white"}/>
                            )}
                        </AccordionButton>
                        </h2>
                        <AccordionPanel pb={8} fontSize={"lg"} bg={"#121316"}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat.
                        </AccordionPanel>
                    </>
                    )}
                </AccordionItem>
                <AccordionItem bg="#242628" borderRadius={"2xl"}my={4}>
                    {({ isExpanded }) => (
                    <>
                        <h2>
                        <AccordionButton>
                            <Box flex={"1"} w={"100%"} my={4} fontSize={"xl"} textAlign='left' bgColor={"#242628"}>
                            How does the content creation feature work?
                            </Box>
                            {isExpanded ? (
                            <MinusIcon fontSize='12px' color={"white"}/>
                            ) : (
                            <AddIcon fontSize='12px' color={"white"}/>
                            )}
                        </AccordionButton>
                        </h2>
                        <AccordionPanel pb={8} fontSize={"lg"} bg={"#121316"}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat.
                        </AccordionPanel>
                    </>
                    )}
                </AccordionItem>
                <AccordionItem bg="#242628" borderRadius={"2xl"}my={4}>
                    {({ isExpanded }) => (
                    <>
                        <h2>
                        <AccordionButton>
                            <Box flex={"1"} w={"100%"} my={4} fontSize={"xl"} textAlign='left' bgColor={"#242628"}>
                            How does Think Content assist with campaign strategy?
                            </Box>
                            {isExpanded ? (
                            <MinusIcon fontSize='12px' color={"white"}/>
                            ) : (
                            <AddIcon fontSize='12px' color={"white"}/>
                            )}
                        </AccordionButton>
                        </h2>
                        <AccordionPanel pb={8} fontSize={"lg"} bg={"#121316"}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat.
                        </AccordionPanel>
                    </>
                    )}
                </AccordionItem>
                <AccordionItem bg="#242628" borderRadius={"2xl"}my={4}>
                    {({ isExpanded }) => (
                    <>
                        <h2>
                        <AccordionButton>
                            <Box flex={"1"} w={"100%"} my={4} fontSize={"xl"} textAlign='left' bgColor={"#242628"}>
                            Is Think Content suitable for my industry or niche?
                            </Box>
                            {isExpanded ? (
                            <MinusIcon fontSize='12px' color={"white"}/>
                            ) : (
                            <AddIcon fontSize='12px' color={"white"}/>
                            )}
                        </AccordionButton>
                        </h2>
                        <AccordionPanel pb={8} fontSize={"lg"} bg={"#121316"}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat.
                        </AccordionPanel>
                    </>
                    )}
                </AccordionItem>        
                <AccordionItem bg="#242628" borderRadius={"2xl"}my={4}>
                    {({ isExpanded }) => (
                    <>
                        <h2>
                        <AccordionButton>
                            <Box flex={"1"} w={"100%"} my={4} fontSize={"xl"} textAlign='left' bgColor={"#242628"}>
                            Can I schedule and automate my social media posts with Think Content?
                            </Box>
                            {isExpanded ? (
                            <MinusIcon fontSize='12px' color={"white"}/>
                            ) : (
                            <AddIcon fontSize='12px' color={"white"}/>
                            )}
                        </AccordionButton>
                        </h2>
                        <AccordionPanel pb={8} fontSize={"lg"} bg={"#121316"}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat.
                        </AccordionPanel>
                    </>
                    )}
                </AccordionItem>                                                        
                </Accordion>
        </>
    )
};

export default FAQ;