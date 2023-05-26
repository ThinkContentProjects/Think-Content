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
                        Think Content is a user friendly AI powered social media tool aimed to help content creators and small businesses plan, create and post on Instagram.
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
                        Think Content will aid you in the content strategy you want based on the tone, narrative and goals you want to achieve from your post which you can input prior to generating
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
                        Think Content uses the latest Artificial Intelligence software powered by Open AI to generate content for your posts. Remember, while AI can enhance your content creation process, it's important to review the generated content to ensure it aligns with your brand
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
                        Think Content taylors a custom campaign strategy for each customer's unique business by using vast amounts of trained data to back their generated plan.

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
                        Yes! Think Content is suitable for almost all industries as it creates a custom profile for your business and customers. Think Content is easy to use for anyone regardless of their technological background.
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
                        Our platform allows for the user to step-by-step brainstorm, create, & schedule their social media posts to our supported social platforms.
                        </AccordionPanel>
                    </>
                    )}
                </AccordionItem>                                                        
                </Accordion>
        </>
    )
};

export default FAQ;