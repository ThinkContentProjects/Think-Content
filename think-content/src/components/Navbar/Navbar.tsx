import React from "react";
import { Flex, useColorModeValue, Image } from "@chakra-ui/react";
import RightContent from "./RightContent/RightContent";
import { User } from "firebase/auth";

type NavBarProps = {
  user?: User | null;
};

const Navbar: React.FC<NavBarProps> = ({ user }) => {
  const bg = useColorModeValue("gray.100", "#121316");

  return (
    <Flex
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
          cursor="pointer"
        >
          <Image
            src="/images/logoLarge.png"
            ml={5}
            height="70px"
            display={{ base: "none", md: "unset" }}
            alt={"Think Content Large Logo"}
          ></Image>
          <Image
            src="/images/logoSmall.png"
            height="60px"
            display={{ md: "none" }}
            alt={"Think Content Small Logo"}
          ></Image>
        </Flex>
      </Flex>
      <RightContent user={user} />
    </Flex>
  );
};

export default Navbar;
