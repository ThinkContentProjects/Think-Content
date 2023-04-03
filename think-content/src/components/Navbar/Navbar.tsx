import React from "react";
import { Flex, Image } from "@chakra-ui/react";
import SearchInput from "./SearchInput";
import RightContent from "./RightContent/RightContent";
import { useAuthState } from "react-firebase-hooks/auth";
import Directory from "./Directory/Directory";
import useDirectory from "@/src/hooks/useDirectory";
import { auth } from "@/src/firebase/firebase";
import { defaultMenuItem } from "@/src/atoms/directoryMenuAtom";

const Navbar: React.FC = () => 
{
  // called once and passed as prop to search and right content
  const [user, loading, error] = useAuthState(auth);
  const { onSelectMenuItem } = useDirectory();

  return (
    <Flex
      bg="white"
      height="50px"
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
        <Image
          display={{ base: "none", md: "unset" }}
          src="/images/logo.png"
          height="43px"
        />
      </Flex>
      {user && <Directory />}
      <SearchInput user={user}/>
      <RightContent user={user} />
    </Flex>
  );
};
export default Navbar;