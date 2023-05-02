import { auth } from "@/src/firebase/firebase";
import { Center, Flex, Spinner } from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Navbar from "../Navbar/Navbar";

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
        <Navbar user={user}/>
        <main>{children}</main>
      </>
    );
  }
};

export default Layout;
