import { AddIcon } from "@chakra-ui/icons";
import {
  Text,
  Box,
  Select,
  Input,
  Textarea,
  Flex,
  Button,
  Spacer,
  Image
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import CreateNewPersonaModal from "./CreatePersona/CreatePersonaModal";
import React, { useState } from "react";
import Persona from "./CreatePersona/Persona";


type BrandProfilesProps = {
    user?: User | null;
};

type GenderType = "Male" | "Female" | "NotSpecified";

type Boxes = {
    personaName : string;
    ageRangeLow : Number;
    ageRangeHigh : Number;
    gender : GenderType;
    painPoints : string;
}

const BrandProfiles: React.FC<BrandProfilesProps> = ({ user }) => {

    const [openCreatePersona, setOpenCreatePersona] = useState(false);
    const [highlightCreateNew, setHighlightCreateNew] = useState(false);
    const [boxes, setBoxes] = useState<{
        personaName : string;
        ageRangeLow : Number;
        ageRangeHigh : Number;
        gender : GenderType;
        painPoints : string;
    }[]>([]);

    const handleSaveBoxes = (newBoxes: Boxes[]) => {
        setBoxes(newBoxes);
    };

    const handleMouseEnter = () => {
        setHighlightCreateNew(true);
    };
    
      const handleMouseLeave = () => {
        setHighlightCreateNew(false);
    };

    return (
        <>
            <CreateNewPersonaModal onSave={handleSaveBoxes} open={openCreatePersona} handleClose={() => {setOpenCreatePersona(false);}} />
            <Box position="relative" ml={-2}>
            <Text fontSize="xl" fontWeight="bold">
                Brand Profiles
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

            <Text pt={"8"} fontSize={"lg"}>
                Selected Brand Profile
            </Text>
            <Select 
                w={28} 
                color={"#959697"} 
                variant="unstyled" 
                mt={4}
                ml={4}
                iconColor={"white"}
            >
                <option value='option1'>persona 1</option>
                <option value='option2'>persona 2</option>
                <option value='option3'>persona 3</option>
            </Select>
            <Text pt={10} pb={3} fontSize={"lg"}>
                Name
            </Text>
            <Input 
                fontSize={"sm"}
                variant={"filled"}
                placeholder='Name' 
                w={48}
                textColor="white"
                ringColor={"#242628"}
                bgColor={"#242628"}
            />
            <Text pt={"8"} pb={3} fontSize={"lg"}>
                Mission
            </Text>
            <Textarea
                borderRadius={"lg"}
                fontSize={"sm"}
                size="md"
                variant={"filled"}
                w={"75%"}
                textColor="white"
                ringColor={"#242628"}
                bgColor={"#242628"}
                placeholder="Describe your persona's mission"
            />
            <Text pt={"8"} pb={3} fontSize={"lg"}>
                Industry
            </Text>
            <Input 
                fontSize={"sm"}
                variant={"filled"}
                placeholder='Your Industry' 
                w={64}
                textColor="white"
                ringColor={"#242628"}
                bgColor={"#242628"}
            />
            <Text pt={"8"} pb={3} fontSize={"lg"}>
                Brand Message
            </Text>
            <Textarea
                borderRadius={"lg"}
                fontSize={"sm"}
                size="xs"
                variant={"filled"}
                w={"75%"}
                textColor="white"
                ringColor={"#242628"}
                bgColor={"#242628"}
                placeholder="Write your brand message here."
            />
            <Flex flexDirection={"row"} pt={8} w="88%">
                <Box position="relative" ml={2}>
                <Text fontSize="xl" fontWeight="bold">
                    Customer Personas
                </Text>
                <Box
                    position="absolute"
                    bottom="-4px" // Adjust this value to move the underline further below
                    left={0}
                    right={0}
                    height="0.5px"
                    bg="white" // Customize the underline color
                    w="44"
                />
                </Box>
                <Spacer/>
                <Button variant="unstyled" w={"-moz-max-content"} onClick={() => setOpenCreatePersona(true)}>
                    <Flex flexDirection="row" justify="space-between">
                        <Box
                            h={6}
                            w={6}
                            borderRadius="md"
                            bg={highlightCreateNew ? "#242628" : "#1E2022"}
                            color={highlightCreateNew ? "white" : ""}
                            _hover={{ color: "white", bg: "#242628" }}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Flex align="center" justify="center" h="100%">
                            <AddIcon
                                _hover={{ color: "white", bg: "#242628" }}
                                color={highlightCreateNew ? "white" : "#959697"}
                                bg={highlightCreateNew ? "#242628" : ""}
                                boxSize={3}
                            />
                            </Flex>
                        </Box>
                        <Text
                            fontSize="sm"
                            px={3}
                            _hover={{ color: "white" }}
                            color={highlightCreateNew ? "white" : "#959697"}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            Create new
                        </Text>
                    </Flex>
                </Button> 
            </Flex>

            <Flex flexDir={"row"} py={12} justify={"space-between"} w={"88%"} flexWrap="wrap">
                {boxes.map((box, index) => (
                    <Box py={4} key={index} w={"50%"}>
                        <Persona index={index} {...box} />
                    </Box>
                ))}
                {boxes.length % 2 !== 0 && (
                    <Box w={"50%"} /> // Empty box for the bottom row if there's an odd number of Personas
                )}
            </Flex>

        </>
    );

};

export default BrandProfiles;
