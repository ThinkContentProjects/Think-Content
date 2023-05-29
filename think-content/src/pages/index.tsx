import { ArrowForwardIcon, MinusIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Icon, Image, Text } from "@chakra-ui/react";
import { HiOutlineSparkles } from "react-icons/hi2";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../atoms/authModalAtom";
import FAQ from "../components/FAQ/FAQ";
import Footer from "../components/Footer/Footer";
import { withPublic } from "../hooks/routes";

export function scrollToSection(sectionId: string) {
  const sectionElement = document.getElementById(sectionId);
  if (sectionElement) {
    sectionElement.scrollIntoView({ behavior: 'smooth' });
  }
}

const Home: React.FC = () => 
{
  const setAuthModalState = useSetRecoilState(authModalState);

  return (
    <>
      
      <Flex h={"5040"} justify={"start"} align={"center"} bg={"#121316"} flexDir={"column"}>
        <Box
          borderColor="#B066EB"
          borderWidth={2}
          borderRadius="xl"
          w={"380px"}
          h={16}
          boxShadow="0px 32px 128px rgba(176, 102, 235, 0.3)"
          mt={16}
          id={"overview"}
        >
          <Flex flexDir={"row"} >
            <Icon as={HiOutlineSparkles} mr={4} ml={3} mt={3} color={"#B066EB"} boxSize={8}/>
            <Text fontSize="xl" px={2} mt={4}>
              Create me a post
            </Text>
            <Text fontSize="md" fontWeight="thin" color={""} px={2} mt={4}>
              |
            </Text>
          </Flex>

        </Box>
        <Text fontSize={"4xl"} fontWeight={"bold"} pt={4} pb={6}>
          Introducting Think Content
        </Text>
        <Text pb={10} color={"#959697"} fontSize={"xl"}>
          The power of AI has come to social media
        </Text>
        <Button fontSize={"sm"} w={32} h={10} mb={12} onClick={() => setAuthModalState({ open: true, view: "login" })}>
          Try for free
          <ArrowForwardIcon/>
        </Button>
        <Image
            borderRadius={"3xl"}
            src={"/images/topGraphic.png"}
            w={"70%"}
            mb={48}
            boxShadow="8px 32px 128px rgba(176, 102, 235, 0.1)"
        />
        <Text pb={8} fontSize={"3xl"} fontWeight={"semibold"} w={"440px"} align={"center"}>
          Strategize, create, and manage effortlessly using AI
        </Text>
        <Text color={"#959697"}  fontSize={"xl"}>
          Dominate your social media presence effortlessly
        </Text>
        <Flex flexDir={"column"} justify={"space-evenly"} align={"center"}>
        <Flex flexDir={"row"} my={24} ml={-24} >
            <Box boxSize={"md"} mx={24} py={16}>
              <Text fontSize={"2xl"} fontWeight={"semibold"} id={"content"}>
                Content Strategy
              </Text>
              <Text fontSize={"lg"} w={"75%"} mt={2} color={"#959697"}>
                Data-driven approach to organically reach your goals
              </Text>
              <Box
                  borderColor="#B066EB"
                  borderWidth={2}
                  borderRadius="xl"
                  w={64}
                  h={10}
                  boxShadow="8px 32px 128px rgba(176, 102, 235, 0.3)"
                  mt={8}
                >
                <Flex flexDir={"row"} >
                  <Text fontSize="md" px={4} mt={1}>
                    Create
                  </Text>
                  <Text fontSize="md" fontWeight="thin" color={""} px={2} mt={1}>
                    |
                  </Text>
                </Flex>
              </Box>
              <Button fontSize={"sm"} w={32} h={10} mt={12} onClick={() => setAuthModalState({ open: true, view: "login" })}>
                Try for free
                <ArrowForwardIcon/>
              </Button>
            </Box>
            <Box boxSize={"md"} borderRadius={"3xl"}>
              <Image
                borderRadius={"3xl"}
                src={"/images/contentStrategy.gif"}
                boxShadow="8px 32px 128px rgba(176, 102, 235,  0.05)"
              />
            </Box>
          </Flex>
          <Flex flexDir={"row"} mb={24} ml={-24}>
            <Box boxSize={"md"} mx={24} py={16}>
            <Text fontSize={"2xl"} fontWeight={"semibold"} id={"creation"}>
                Content Creation
              </Text>
              <Text fontSize={"lg"} w={"75%"} mt={2} color={"#959697"}>
                Produce high-quality, engaging content with a few clicks
              </Text>
              <Box
                  borderColor="#B066EB"
                  borderWidth={2}
                  borderRadius="xl"
                  w={64}
                  h={10}
                  boxShadow="8px 32px 128px rgba(176, 102, 235, 0.3)"
                  mt={8}
                >
                <Flex flexDir={"row"} >
                  <Text fontSize="md" px={4} mt={1}>
                    Explore
                  </Text>
                  <Text fontSize="md" fontWeight="thin" color={""} px={2} mt={1}>
                    |
                  </Text>
                </Flex>
              </Box>
              <Button fontSize={"sm"} w={32} h={10} mt={12} onClick={() => setAuthModalState({ open: true, view: "login" })}>
                Try for free
                <ArrowForwardIcon/>
              </Button>              
            </Box>
            <Box boxSize={"md"} borderRadius={"3xl"}>
              <Image
                borderRadius={"3xl"}
                src={"/images/contentCreation.gif"}
                boxShadow="8px 32px 128px rgba(176, 102, 235,  0.05)"
              />
            </Box>
          </Flex>
          <Flex flexDir={"row"} mb={24} ml={-24}>
            <Box boxSize={"md"} mx={24} py={16}>
            <Text fontSize={"2xl"} fontWeight={"semibold"} id={"campaign"}>
                Campaign Strategy
              </Text>
              <Text fontSize={"lg"} w={"75%"} mt={2} color={"#959697"}>
                Precise, tailored strategires to produce successful paid campaigns
              </Text>
              <Box
                  borderColor="#B066EB"
                  borderWidth={2}
                  borderRadius="xl"
                  w={64}
                  h={10}
                  boxShadow="8px 32px 128px rgba(176, 102, 235, 0.3)"
                  mt={8}
                >
                <Flex flexDir={"row"} >
                  <Text fontSize="md" px={4} mt={1}>
                    Succeed
                  </Text>
                  <Text fontSize="md" fontWeight="thin" color={""} px={2} mt={1}>
                    |
                  </Text>
                </Flex>
              </Box>
              <Button fontSize={"sm"} w={32} h={10} mt={12} onClick={() => setAuthModalState({ open: true, view: "login" })}>
                Try for free
                <ArrowForwardIcon/>
              </Button>              
            </Box>
            <Box boxSize={"md"} borderRadius={"3xl"}>
              <Image
                borderRadius={"3xl"}
                src={"/images/campaignStrategy.gif"}
                boxShadow="8px 32px 128px rgba(176, 102, 235, 0.05)"
              />              
            </Box>
          </Flex>
        </Flex>
        <FAQ/>
        <Text fontSize={"4xl"} fontWeight={"bold"}  pt={32}>
          Be the first to try Think Content
        </Text>
        <Text fontSize={"lg"} w={"400px"} mt={2} color={"#959697"} align={'center'}>
          Join our limited-time free trial to experience and help us improve our realy preview of Think Content
        </Text>
        <Button fontSize={"sm"} w={32} h={10} mt={8} mb={72} onClick={() => setAuthModalState({ open: true, view: "login" })}>
          Try for free
          <ArrowForwardIcon/>
        </Button>  
        <Footer/>
      </Flex>
    </>
  )
}

export default withPublic(Home);