import React from "react";
import { Flex, Icon, useColorModeValue } from "@chakra-ui/react";
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

const Navbar: React.FC<NavBarProps> = ({user}) => {
  // called once and passed as prop to search and right content
  const { onSelectMenuItem } = useDirectory();
  const bg = useColorModeValue("white", "brand.50");

  return (
    <Flex
      boxShadow="sm"
      height="50px"
      bg={bg}
      padding="6px 12px"
      justify={{ md: "space-between" }}
    >
      <Flex>
        <Flex
          align="center"
          width={{ base: "40px", md: "auto" }}
          mr={{ base: 0, md: 100 }}
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
      </Flex>
      <RightContent user={user} />
    </Flex>
  );
};

export default Navbar;
