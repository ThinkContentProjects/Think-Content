import { Button, Divider, Flex, Icon, Image, Text, textDecoration } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { BsInstagram, BsLinkedin } from 'react-icons/bs';

type FooterProps = {
    
};

const Footer:React.FC<FooterProps> = () => {

    const router = useRouter();
    
    return (
        <>  
            <Flex flexDir={"row"} w={"80%"} >
                <Flex flexDir={"column"} align="end" w={"30%"}>
                    <Image
                        src={"/images/logoSmall.png"}
                        h={"122px"}
                        w={"228px"}
                    />
                </Flex>
                <Flex flexDir={"row"} justify={"space-around"} w={"60%"}>
                    <Flex flexDir={"column"}  w="20%" align={"start"}>
                        <Text pb={4} fontSize={"xl"} fontWeight={"bold"}>
                            Product
                        </Text>
                        <Button variant="unstyled" color={"#959697"} _hover={{color : "white"}} onClick={() => router.push("/")}>
                            Features
                        </Button>
                        <Button variant="unstyled" color={"#959697"} _hover={{color : "white"}} onClick={() => router.push("/pricing")}>
                            Pricing
                        </Button>
                    </Flex>
                    <Flex flexDir={"column"} w="20%" align={"start"}>
                        <Text pb={4} fontSize={"xl"} fontWeight={"bold"}>
                            Company
                        </Text>
                        <Button variant="unstyled" color={"#959697"} _hover={{color : "white"}}>
                            Terms & Conditions
                        </Button>
                        <Button variant="unstyled" color={"#959697"} _hover={{color : "white"}}>
                            Privacy
                        </Button>
                    </Flex>
                    <Flex flexDir={"column"} w={"20%"} align={"start"}>
                        <Text pb={4} fontSize={"xl"} fontWeight={"bold"}>
                            Contact
                        </Text>
                        <Button variant="unstyled" color={"#959697"} _hover={{color : "white"}}>
                            info@thinkcontent.xzy
                        </Button>
                    </Flex>
                </Flex>
                
            </Flex>
            <Divider w={"65%"} my={16}/>
            <Flex flexDir="row" pt={8} w="65%" justify="space-between">
                <Text fontSize={"xs"}>
                ® 2023 - Think Content
                </Text>
                <Flex>
                    <Icon as={BsInstagram} ml={6} boxSize={6}/>
                    <Icon as={BsLinkedin} ml={6} boxSize={6}/>
                </Flex>
            </Flex>
        </>
    );
}
export default Footer;