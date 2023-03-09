import React from "react";
import { Flex, Image } from "@chakra-ui/react";
import SearchInput from "./SearchInput";
import RightContent from "./RightContent/RightContent";

const Navbar: React.FC = () => 
{

  return (
    <Flex
      bg="white"
      height="44px"
      padding="6px 12px"
      justifyContent={{ md: "space-between" }}
    >
      <Flex
        align="center"
        width={{ base: "40px", md: "auto" }}
        mr={{ base: 0, md: 2 }}
        cursor="pointer"
      >
        <Image
          display={{ base: "none", md: "unset" }}
          src="/images/logo.png"
          height="46px"
        />
      </Flex>
      {/* {user && <Directory />} */}
      <SearchInput />
      <RightContent />
    </Flex>
  );
};
export default Navbar;