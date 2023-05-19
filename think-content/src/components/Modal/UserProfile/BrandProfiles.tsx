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
import React from "react";


type BrandProfilesProps = {
    user?: User | null;
  };

const BrandProfiles: React.FC<BrandProfilesProps> = ({ user }) => {

    return (
        <>
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
                <Button variant="unstyled" w={"-moz-max-content"} >
                    <Flex flexDirection={"row"} justify={"space-between"} >
                        <Box
                            bg="#1E2022"
                            h={6}
                            w={6}
                            borderRadius={"md"}
                            _hover={{ color: 'white', bg: "#242628"}}
                        >
                            <Flex align="center" justify="center" h="100%">
                                <AddIcon _hover={{ color: 'white', bg: "#242628"}} color={"#959697"} boxSize={3}/>
                            </Flex>
                        </Box>
                        <Text _hover={{ color: 'white'}} fontSize="sm" color={"#959697"} px={3}>
                            Create new
                        </Text>
                    </Flex>
                </Button> 
            </Flex>

            <Flex flexDir={"row"} py={12} justify={"space-between"} w={"88%"}>
                <Box boxSize={80} bgColor={"#242628"} borderRadius={"xl"}>
                    <Flex flexDirection={"row"}>
                        <Image
                            src="/images/womanProfile.PNG"
                            m={5}
                            pr={2}
                            height="100px"
                        />
                        <Text fontSize="lg" color={"white"} my={14}>
                            Young Female
                        </Text>
                    </Flex>
                    <Flex pr={10} pl={4} flexDirection={"row"} justify="space-around">
                        <Text justifySelf={"center"} fontSize="sm" color={"#959697"} px={3}>
                            Age
                        </Text>
                        <Text  fontSize="sm" color={"#959697"} px={3}>
                            Female
                        </Text>
                    </Flex>

                </Box>
                <Box boxSize={80} bgColor={"#242628"} borderRadius={"xl"}>

                </Box>
            </Flex>

        </>
    );

};

export default BrandProfiles;