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
  Image,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack
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
import { MdAccountCircle, MdAttachMoney, MdGraphicEq, MdOutlinePayments, MdWorkspacesOutline } from 'react-icons/md'
import { TbBrandAsana, TbReceipt2 } from "react-icons/tb";
import { CloseIcon } from "@chakra-ui/icons";
import { FaMoneyBillAlt } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi2";



type CreateNewPersonaModalProps = {
    open: boolean;
    handleClose: () => void;
  };

type ButtonName = "Male" | "Female" | "Not Specified";

const CreateNewPersonaModal: React.FC<CreateNewPersonaModalProps> = ({
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

    const [selectedButton, setSelectedButton] = useState<ButtonName | null>(null);

    const handleButtonClick = (buttonName: ButtonName) => {
        setSelectedButton(buttonName);
    };

    const marks = [13, 25, 45, 65];

    

    return (
        <>
            <Modal isOpen={open} onClose={handleClose} size="xl">
                <ModalOverlay/>
                <ModalContent borderRadius={"2xl"} p={4}>
                    <ModalHeader>
                        
                    </ModalHeader>
                    <ModalBody>
                            <ModalCloseButton />
                            <Flex flexDirection={"row"} justify={"space-around"}>
                                <Flex flexDir={"column"} mt={-8}>
                                    <Image
                                        src="/images/darkerBgWomanProfile.PNG"
                                        h={"180px"}
                                        w={"180px"}
                                        mx={2}
                                    />
                                    <Button 
                                        variant={"unstyled"}
                                        fontSize={"xs"}
                                        color={"#959697"}
                                        fontWeight={"semibold"}
                                        mt={-2}
                                        _hover={{textDecor : "underline", textColor : "white"}}
                                    >
                                        Change image
                                    </Button>
                                </Flex>
                                <Flex flexDir={"column"} justify={"center"} align={"center"} mr={-10} mt={-10}>
                                    <Text fontSize="md" color={"white"} mt={14} mb={4} ml={8} fontWeight={"semibold"} alignSelf={"start"}>
                                        Persona Name
                                    </Text>
                                    <Input 
                                        fontSize={"sm"} 
                                        variant={"filled"} 
                                        placeholder={"Name"} 
                                        w={"70%"} 
                                        sx={{"::placeholder": {color: "#959697",},}}
                                        borderRadius={"lg"}
                                        ml={-10}
                                    />
                                    <Text fontSize="md" color={"white"} mt={8} mb={4} fontWeight={"semibold"} alignSelf={"start"} ml={8}>
                                        Gender
                                    </Text>
                                    <Flex
                                        flexDir="row"
                                        h="-moz-min-content"
                                        justify="space-evenly"
                                        w="100%"
                                        justifyContent="center"
                                        alignSelf="start"                         
                                    >
                                        <Button
                                            variant="unstyled"
                                            bg={selectedButton === "Male" ? "#414345" : "#242628"}
                                            h={6}
                                            w={"90px"}
                                            fontSize="xs"
                                            mx={2}
                                            _hover={{ bg: "#414345" }}
                                            onClick={() => handleButtonClick("Male")}
                                        >
                                            Male
                                        </Button>
                                        <Button
                                            variant="unstyled"
                                            bg={selectedButton === "Female" ? "#414345" : "#242628"}
                                            h={6}
                                            w={"90px"}
                                            fontSize="xs"
                                            mx={2}
                                            _hover={{ bg: "#414345" }}
                                            onClick={() => handleButtonClick("Female")}
                                        >
                                            Female
                                        </Button>
                                        <Button
                                            variant="unstyled"
                                            bg={selectedButton === "Not Specified" ? "#414345" : "#242628"}
                                            h={6}
                                            w={"90px"}
                                            fontSize="xs"
                                            mx={2}
                                            _hover={{ bg: "#414345" }}
                                            onClick={() => handleButtonClick("Not Specified")}
                                        >
                                            Not Specified
                                        </Button>
                                    </Flex>
                                        <Text fontSize="md" color={"white"} mt={8} mb={4} fontWeight={"semibold"} alignSelf={"start"} ml={8}>
                                            Age
                                        </Text>
                                        <Flex direction="column" align="center" w="100%">
                                        <RangeSlider aria-label={["min", "max"]} defaultValue={[13, 65]} w="80%">
                                            <RangeSliderTrack h="6px" borderRadius="full">
                                            <RangeSliderFilledTrack bg="blue.500" bgGradient="linear(to-l, white, #0000B6)" />
                                            </RangeSliderTrack>
                                            <RangeSliderThumb boxSize={"18px"} index={0} alignItems="end" justifyContent="end">
                                            <Box borderRadius="50%" bg="blue.300" w="50%" h="50%" transform="translate(-50%, -50%)" />
                                            </RangeSliderThumb>
                                            <RangeSliderThumb boxSize={"18px"} index={1} alignItems="end" justifyContent="end">
                                            <Box borderRadius="50%" bg="blue.300" w="50%" h="50%" transform="translate(-50%, -50%)" />
                                            </RangeSliderThumb>
                                        </RangeSlider>
                                        <Flex justify="space-between" w="80%">
                                            {marks.map((mark) => (
                                            <Text
                                                key={mark}
                                                color={"gray.400"}
                                                fontSize="xs"
                                            >
                                                {mark === 65 ? "65+" : mark}
                                            </Text>
                                            ))}
                                        </Flex>
                                        </Flex>
                                </Flex>

                            </Flex>
                            <Flex flexDir={"column"} w={"100%"}>
                                <Flex>
                                    <Text fontSize="md" color={"white"} mt={8} mb={4} fontWeight={"semibold"}>
                                        Paint Points 
                                    </Text>
                                    <Text fontSize="md" color={"#959697"} mt={8} mb={4} mx={2} fontWeight={"semibold"}>
                                            (Optional)
                                    </Text>
                                </Flex>
                                <Text w={"70%"} fontSize="10" color="#959697" mb={4} fontWeight="semibold" lineHeight="6">
                                    Describe the pain of your target audience that relates to your product.
                                    Seperate each pain point with a comma.
                                </Text>
                                <Input 
                                    fontSize={"sm"} 
                                    variant={"filled"} 
                                    placeholder={"Pain points"} 
                                    w={"85%"} 
                                    h={16}
                                    sx={{"::placeholder": {color: "#959697",},}}
                                    borderRadius={"lg"}
                                />
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