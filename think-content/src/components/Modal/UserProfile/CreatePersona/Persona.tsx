import { auth } from "@/src/firebase/firebase";
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
  Text,
  Input,
  Flex,
  Image,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Icon
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiOutlineUser } from "react-icons/ai";
import { IoIosPerson } from "react-icons/io";
import "react-tabs/style/react-tabs.css";
import CreatePersonaModal from './CreatePersonaModal';
import { FaUser } from 'react-icons/fa';

type PersonaProps = {
    personaName : string;
    ageRangeLow : Number;
    ageRangeHigh : Number;
    gender : string;
    painPoints : string;
    index : Number;
};

const Persona: React.FC<PersonaProps> = ({ 
    personaName,
    ageRangeLow, 
    ageRangeHigh,
    gender,
    painPoints,
    index
}) => {
    
    const Range = ageRangeLow + "-" + ageRangeHigh;

    return (
        <>
            <Box boxSize={80} bgColor={"#242628"} borderRadius={"xl"}>
                <Flex flexDirection={"row"}>
                {gender === "NotSpecified" ? (
                    <Box
                        bg="#959697"
                        borderRadius="50%"
                        width="75px"
                        height="75px"
                        m={8}
                        pr={2}
                    >
                        <Icon as={FaUser} color="purple.600" boxSize={12} m={3}/>  
                    </Box>
                    ) : (
                    <Image
                        src={"/images/"+gender+"Profile.PNG"}
                        m={5}
                        pr={2}
                        height="100px"
                    />
                    )}          
                    
                    <Text fontSize="lg" color={"white"} my={14}>
                        {personaName === "" ? "Customer"+index: personaName}
                    </Text>
                </Flex>
                <Flex pr={10} pl={4} flexDirection={"row"} justify="space-around">
                    <Text fontSize="sm" color={"#959697"} px={3}>
                        Age
                    </Text>
                    <Text  fontSize="sm" color={"#959697"} px={3}>
                        Gender
                    </Text>
                </Flex>
                <Flex pr={10} pl={4} flexDirection={"row"} justify="space-around">
                    <Text fontSize="md" color={"white"} px={3} fontWeight={"semibold"}>
                        {Range}
                    </Text>
                    <Text  fontSize="md" color={"white"} px={3} fontWeight={"semibold"}>
                        {gender === "NotSpecified" ? "Not Specified": gender}
                    </Text>
                </Flex>
                <Text  fontSize="sm" color={"#959697"} px={10} pt={6}>
                    Pain Points
                </Text>
                <Text  fontSize="md" color={"white"} px={8} pt={2}>
                    {painPoints === "" ? "N/A": painPoints}
                </Text>
            </Box>
        </>
    );
};

export default Persona