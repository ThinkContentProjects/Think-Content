import {
  Text,
  Box,
  Select,
  Input,
  Textarea,
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
                ml={6}
                iconColor={"white"}
            >
                <option value='option1'>persona 1</option>
                <option value='option2'>persona 2</option>
                <option value='option3'>persona 3</option>
            </Select>
            <Text pt={"8"} pb={3} fontSize={"lg"}>
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
            <Box position="relative" ml={-2}>
            <Text fontSize="xl" fontWeight="bold" pt={8} >
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
        </>
    );

};

export default BrandProfiles;