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
            <Accordion allowMultiple justifyContent={"center"}>
                <AccordionItem w={"50%"} h={"32"}>
                    {({ isExpanded }) => (
                    <>
                        <h2>
                        <AccordionButton>
                            <Box as="span" flex='1' textAlign='left'>
                            Section 2 title
                            </Box>
                            {isExpanded ? (
                            <MinusIcon fontSize='12px' />
                            ) : (
                            <AddIcon fontSize='12px' />
                            )}
                        </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat.
                        </AccordionPanel>
                    </>
                    )}
                </AccordionItem>
                <AccordionItem>
                    {({ isExpanded }) => (
                    <>
                        <h2>
                        <AccordionButton>
                            <Box as="span" flex='1' textAlign='left'>
                            Section 2 title
                            </Box>
                            {isExpanded ? (
                            <MinusIcon fontSize='12px' />
                            ) : (
                            <AddIcon fontSize='12px' />
                            )}
                        </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat.
                        </AccordionPanel>
                    </>
                    )}
                </AccordionItem>
                <AccordionItem>
                    {({ isExpanded }) => (
                    <>
                        <h2>
                        <AccordionButton>
                            <Box as="span" flex='1' textAlign='left'>
                            Section 2 title
                            </Box>
                            {isExpanded ? (
                            <MinusIcon fontSize='12px' />
                            ) : (
                            <AddIcon fontSize='12px' />
                            )}
                        </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat.
                        </AccordionPanel>
                    </>
                    )}
                </AccordionItem>
                <AccordionItem>
                    {({ isExpanded }) => (
                    <>
                        <h2>
                        <AccordionButton>
                            <Box as="span" flex='1' textAlign='left'>
                            Section 2 title
                            </Box>
                            {isExpanded ? (
                            <MinusIcon fontSize='12px' />
                            ) : (
                            <AddIcon fontSize='12px' />
                            )}
                        </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat.
                        </AccordionPanel>
                    </>
                    )}
                </AccordionItem>
                <AccordionItem>
                    {({ isExpanded }) => (
                    <>
                        <h2>
                        <AccordionButton>
                            <Box as="span" flex='1' textAlign='left'>
                            Section 2 title
                            </Box>
                            {isExpanded ? (
                            <MinusIcon fontSize='12px' />
                            ) : (
                            <AddIcon fontSize='12px' />
                            )}
                        </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat.
                        </AccordionPanel>
                    </>
                    )}
                </AccordionItem>
                <AccordionItem>
                    {({ isExpanded }) => (
                    <>
                        <h2>
                        <AccordionButton>
                            <Box as="span" flex='1' textAlign='left'>
                            Section 2 title
                            </Box>
                            {isExpanded ? (
                            <MinusIcon fontSize='12px' />
                            ) : (
                            <AddIcon fontSize='12px' />
                            )}
                        </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
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