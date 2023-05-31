import {
  Flex,
  Text,
  Box,
  Input,
  Button,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import React from "react";


type AccountInformationProps = {
    user?: User | null;
  };

const AccountInformation: React.FC<AccountInformationProps> = ({ user }) => {
    //Show hide password states
    const [showCurr, setShowCurr] = React.useState(false)
    const [showNew, setShowNew] = React.useState(false)
    const [showConf, setShowConf] = React.useState(false)
    const showCurrClick = () => setShowCurr(!showCurr)
    const showNewClick = () => setShowNew(!showNew)
    const showConfClick = () => setShowConf(!showConf)
    return (
        <>
            <Box position="relative" ml={-2}>
                <Text fontSize="xl" fontWeight="bold">
                    Personal Details
                </Text>
                <Box
                    position="absolute"
                    bottom="-4px" // Adjust this value to move the underline further below
                    left={0}
                    right={0}
                    height="0.5px"
                    bg="white" // Customize the underline color
                    w="36"
                />
            </Box>
                <Flex flexDir={"column"}>
                    <Flex flexDir={"row"}>
                        <Box width="50%">
                            <Text pt={"8"} pb={1} fontSize={"sm"}>
                                Email
                            </Text>
                            <Input 
                                borderRadius={"lg"}
                                size={"sm"}
                                fontSize={"xs"}
                                variant={"filled"}
                                placeholder='Email' 
                                textColor="white"
                                ringColor={"#242628"}
                                bgColor={"#242628"}
                            />
                        </Box>
                        <Box flex={"1"} pl={20} mt={14}>
                            <Button 
                                w="-moz-min-content"
                                variant={"unstyled"}
                                fontSize={"xs"}
                                fontWeight={"normal"}
                                px={6}
                                py={2}
                                h="-moz-min-content"
                                color="gray.400" 
                                bg="#242628"
                                _hover={{ color: 'white', bg: "#242628"}}
                                //On-Click Action Needed Here
                            >
                                Send Password Request
                            </Button>
                        </Box>
                    </Flex>
                    
                    <Box width="50%">
                        <Text pt={"8"} pb={1} fontSize={"sm"}>
                            First Name
                        </Text>
                        <Input 
                            borderRadius={"lg"}
                            size={"sm"}
                            fontSize={"xs"}
                            variant={"filled"}
                            placeholder='First Name' 
                            textColor="white"
                            ringColor={"#242628"}
                            bgColor={"#242628"}
                        />
                    </Box>
                    <Box width="50%">
                        <Text pt={"8"} pb={1} fontSize={"sm"}>
                            Last Name
                        </Text>
                        <Input 
                            borderRadius={"lg"}
                            size={"sm"}
                            fontSize={"xs"}
                            variant={"filled"}
                            placeholder='Last Name' 
                            textColor="white"
                            ringColor={"#242628"}
                            bgColor={"#242628"}
                        />
                    </Box>
                </Flex>

                <Box position="relative" pt={10} ml={-2}>
                    <Text fontSize="xl" fontWeight="bold">
                        Personal Details
                    </Text>
                    <Box
                        position="absolute"
                        bottom="-4px" // Adjust this value to move the underline further below
                        left={0}
                        right={0}
                        height="0.5px"
                        bg="white" // Customize the underline color
                        w="36"
                    />
                </Box>

                <Flex flexDir={"column"}>
                    <Box width="50%">
                        <Text pt={"8"} pb={1} fontSize={"sm"}>
                            Current Password
                        </Text>
                        <InputGroup
                            borderRadius={"lg"}
                            size={"sm"}
                            fontSize={"xs"}
                            variant={"filled"}
                            placeholder='Email' 
                            textColor="white"
                            ringColor={"#242628"}
                            bgColor={"#242628"}
                            borderColor={"white"}
                        >
                            <Input
                                pr='4.5rem'
                                type={showCurr ? 'text' : 'password'}
                                placeholder='Enter current password'
                                borderRadius={"lg"}
                            />
                            <InputRightElement width='4rem' >
                                <Button variant="unstyles" h='-moz-min-content' size='xs' onClick={showCurrClick}>
                                {showCurr ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </Box>
                    <Box width="50%">
                        <Text pt={"8"} pb={1} fontSize={"sm"}>
                            New Password
                        </Text>
                        <InputGroup
                            borderRadius={"lg"}
                            size={"sm"}
                            fontSize={"xs"}
                            variant={"filled"}
                            placeholder='Email' 
                            textColor="white"
                            ringColor={"#242628"}
                            bgColor={"#242628"}
                            borderColor={"white"}
                        >
                            <Input
                                pr='4.5rem'
                                type={showNew ? 'text' : 'password'}
                                placeholder='Enter new password'
                                borderRadius={"lg"}
                            />
                            <InputRightElement width='4rem' >
                                <Button variant="unstyles" h='-moz-min-content' size='xs' onClick={showNewClick}>
                                {showNew ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </Box>
                    <Box width="50%">
                        <Text pt={"8"} pb={1} fontSize={"sm"}>
                            Confirm New Password
                        </Text>
                        <InputGroup
                            borderRadius={"lg"}
                            size={"sm"}
                            fontSize={"xs"}
                            variant={"filled"}
                            placeholder='Email' 
                            textColor="white"
                            ringColor={"#242628"}
                            bgColor={"#242628"}
                            borderColor={"white"}
                        >
                            <Input
                                pr='4.5rem'
                                type={showConf ? 'text' : 'password'}
                                placeholder='Re-enter new password'
                                borderRadius={"lg"}
                            />
                            <InputRightElement width='4rem' >
                                <Button variant="unstyles" h='-moz-min-content' size='xs' onClick={showConfClick}>
                                {showConf ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </Box>
                </Flex>
                <Box width="50%">
                    <Text pt={"8"} pb={4} fontSize={"lg"} fontWeight={"bold"}>
                        Creation Date
                    </Text>
                    <Box 
                        borderRadius={"lg"}
                        fontSize={"xs"}
                        placeholder='Last Name' 
                        textColor="white"
                        bgColor={"#242628"}
                        ringColor={"#242628"}
                    >
                        <Text py={2} px={3} fontSize={"sm"} h={"-moz-min-content"}>
                            January 1, 2023
                        </Text>
                    </Box>
                </Box>

                <Box width="50%">
                    <Text pt={"8"} pb={4} decoration={"underline"} fontSize={"xl"} fontWeight={"extrabold"}>
                        Delete Account
                    </Text>
                    <Box 
                        borderRadius={"lg"}
                        fontSize={"xs"}
                        placeholder='Last Name' 
                        textColor="white"
                        bgColor={"#242628"}
                    >
                        <Text px={3} fontSize={"10"}>
                            This action is irreversible, please make sure you&apos;re certain of it.
                            <Button 
                                variant="unstyled" 
                                fontSize={"13"} 
                                pl={8} 
                                textDecoration={"underline"} 
                                textColor="red.400"
                                textStyle={"bold"}
                                _hover={{ color:"red.500"}}
                            >
                                Delete Account
                            </Button>
                        </Text>
                    </Box>
                </Box>
        </>
    );

};

export default AccountInformation;