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
  RangeSliderTrack
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import "react-tabs/style/react-tabs.css";



type CreateNewPersonaModalProps = {
    open: boolean;
    handleClose: () => void;
    onSave: (boxes: any) => void;
};

type GenderType = "Male" | "Female" | "NotSpecified";

const CreateNewPersonaModal: React.FC<CreateNewPersonaModalProps> = ({
  open,
  handleClose,
  onSave
}) => {
    const [user] = useAuthState(auth);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [selectedButton, setSelectedButton] = useState("NotSpecified");

    const handleButtonClick = (buttonName: GenderType) => {
        setSelectedButton(buttonName);
    };


    //Persona UseStates
    const [personaName, setPersonaName] = useState('');
    const [ageRangeLow, setAgeRangeLow] = useState(25);
    const [ageRangeHigh, setAgeRangeHigh] = useState(45);
    const [gender, setGender] = useState("NotSpecified");
    const [painPoints, setPainPoints] = useState('');

    const handleRangeChange = (values: [any, any]) => {
        const [low, high] = values;
        setAgeRangeLow(low);
        setAgeRangeHigh(high);
    };

    //Adding a box
    const [boxes, setBoxes] = useState<{
        personaName : string;
        ageRangeLow : Number;
        ageRangeHigh : Number;
        gender : GenderType;
        painPoints : string;
    }[]>([]);

    const handleAddBox = () => {
        const newBox = {
          personaName,
          ageRangeLow,
          ageRangeHigh,
          gender,
          painPoints
        };
    
        setBoxes((prevBoxes: any) => [...prevBoxes, newBox]);
        setPersonaName("");
        setAgeRangeLow(25);
        setAgeRangeHigh(45);
        setGender("NotSpecified");
        setPainPoints("");
        setSelectedButton("NotSpecified");
      };
    
      const handleSave = () => {
        handleAddBox(); // Add the current box to the boxes array
        handleClose(); // Close the modal
        onSave([...boxes, { // Pass the updated boxes array to the parent component
          personaName,
          ageRangeLow,
          ageRangeHigh,
          gender,
          painPoints
        }]);
      }

    return (
        <>
            <Modal isOpen={open} onClose={handleClose} size="xl">
                <ModalOverlay/>
                <ModalContent borderRadius={"2xl"} p={4}>
                    <ModalHeader>
                        
                    </ModalHeader>
                    <ModalBody>
                            <ModalCloseButton/>
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
                                        value={personaName}
                                        onChange={(event) => setPersonaName(event.target.value)}
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
                                            onClick={() => {
                                                handleButtonClick("Male");
                                                setGender("Male");
                                            }}
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
                                            onClick={() => {
                                                handleButtonClick("Female");
                                                setGender("Female");
                                            }}
                                        >
                                            Female
                                        </Button>
                                        <Button
                                            variant="unstyled"
                                            bg={selectedButton === "NotSpecified" ? "#414345" : "#242628"}
                                            h={6}
                                            w={"90px"}
                                            fontSize="xs"
                                            mx={2}
                                            _hover={{ bg: "#414345" }}

                                            onClick={() => {
                                                handleButtonClick("NotSpecified");
                                                setGender("NotSpecified");
                                            }}
                                        >
                                            Not Specified
                                        </Button>
                                    </Flex>
                                            <Flex flexDir={"row"} alignSelf={"start"} ml={10} mt={8} mb={4} >
                                                <Text fontSize="md" color={"white"} fontWeight={"semibold"} >
                                                    Age
                                                </Text>
                                                <Text fontSize="md" ml={44} color={"white"} fontWeight={"semibold"}>
                                                    <>
                                                        {ageRangeLow}-{ageRangeHigh == 65 ? "65+": ageRangeHigh}
                                                    </>
                                                </Text>
                                            </Flex>

                                        <Flex direction="column" align="center" w="100%">

                                            <RangeSlider
                                            aria-label={["min", "max"]}
                                            defaultValue={[ageRangeLow, ageRangeHigh]}
                                            w="80%"
                                            onChange={handleRangeChange}
                                            min={13}
                                            max={65}
                                            step={1}
                                            >
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
                                    value={painPoints}
                                    onChange={(event) => setPainPoints(event.target.value)}
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
                            onClick={() => {
                                handleSave();
                            }}
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