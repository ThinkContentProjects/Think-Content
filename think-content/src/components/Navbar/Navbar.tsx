import React from "react";
import { Flex, Icon, useColorModeValue, Image } from "@chakra-ui/react";
import RightContent from "./RightContent/RightContent";
import { useAuthState } from "react-firebase-hooks/auth";
import Directory from "./Directory/Directory";
import useDirectory from "@/src/hooks/useDirectory";
import { defaultMenuItem } from "@/src/atoms/directoryMenuAtom";
import { AiFillHome } from "react-icons/ai";
import { User } from "firebase/auth";

type NavBarProps = {
  user?: User | null;
};

const Navbar: React.FC<NavBarProps> = ({ user }) => {
  // called once and passed as prop to search and right content
  const { onSelectMenuItem } = useDirectory();
  const bg = useColorModeValue("gray.100", "#121316");

  return (
    <Flex
      boxShadow="sm"
      height="80px"
      style={{ position: "sticky", top: 0 }}
      bg={bg}
      zIndex={1}
      padding="6px 12px"
      justify="space-between"
    >
      <Flex>
        <Flex
          align="center"
          // width={{ base: "100px", md: "auto" }}
          // mr={{ base: 0, md: 100 }}
          cursor="pointer"
          onClick={() => onSelectMenuItem(defaultMenuItem)}
        >
          <Image
            src="/images/logoLarge.png"
            ml={5}
            height="70px"
            display={{ base: "none", md: "unset" }}
          ></Image>
          <Image
            src="/images/logoSmall.png"
            height="60px"
            display={{ md: "none" }}
          ></Image>
        </Flex>
        <Flex mt={5} display={{ md: "none" }}>
          {user && <Directory />}
        </Flex>
      </Flex>
      <RightContent user={user} />
    </Flex>
  );
};

export default Navbar;
