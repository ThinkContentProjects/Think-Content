import React from "react";
import { Button, Flex, Icon, Image, useColorMode, useColorModeValue } from "@chakra-ui/react";
import SearchInput from "./SearchInput";
import RightContent from "./RightContent/RightContent";
import { useAuthState } from "react-firebase-hooks/auth";
import Directory from "./Directory/Directory";
import useDirectory from "@/src/hooks/useDirectory";
import { auth } from "@/src/firebase/firebase";
import { defaultMenuItem } from "@/src/atoms/directoryMenuAtom";
import { AiFillHome } from 'react-icons/ai';

const Navbar: React.FC = () => {
  // called once and passed as prop to search and right content
  const [user, loading, error] = useAuthState(auth);
  const { onSelectMenuItem } = useDirectory();
  const { toggleColorMode } = useColorMode();
  const bg = useColorModeValue('white', '#3C3C3C')

  return (
    <Flex
      boxShadow="sm"
      height="50px"
      bg={bg}
      padding="6px 12px"
      justify={{ md: "space-between" }}
    >
      <Flex
        align="center"
        width={{ base: "40px", md: "auto" }}
        mr={{ base: 0, md: 2 }}
        cursor="pointer"
        onClick={() => onSelectMenuItem(defaultMenuItem)}
      >
        <Icon
          display={{ base: "none", md: "unset" }}
          as={AiFillHome}
          fontSize={30}
        />
      </Flex>
      {user && <Directory />}
      {/* <SearchInput user={user}/> */}
      <RightContent user={user} />
    </Flex>
  );
};
export default Navbar;
