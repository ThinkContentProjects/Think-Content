import { auth } from "@/src/firebase/firebase";
import {
  Box,
  Center,
  Flex,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <Flex
        width={"100vw"}
        height={"100vh"}
        alignContent={"center"}
        justifyContent={"center"}
      >
        <Center>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="purple.500"
            size="xl"
          />
        </Center>
      </Flex>
    );
  } else {
    return (
      <>
        <Navbar user={user} />
        {user && <Sidebar children={undefined} />}
        <Box
          bg={useColorModeValue("white", "#191A1D")}
          borderRadius={20}
          ml={user ? { base: 5, md: 280 } : 5}
          h="calc(100vh)"
        >
          {children}
        </Box>
      </>
    );
  }
};

export default Layout;
