import React from "react";
import { Box, Button, Flex, Icon, Text } from "@chakra-ui/react";
import { CiSettings, CiChat2 } from "react-icons/ci";
import { FaCrown } from "react-icons/fa";
import NotificationMenu from "./NotificationMenu/NotificationMenu";
import { User } from "firebase/auth";
import { BsPersonFillAdd } from "react-icons/bs";
import { useSetRecoilState } from "recoil";
import { inviteModalState } from "@/src/atoms/inviteModalAtom";
import { defaultMenuItem } from "@/src/atoms/directoryMenuAtom";
import useDirectory from "@/src/hooks/useDirectory";

type ActionIconsProps = {
  user: User;
};

const ActionIcons: React.FC<ActionIconsProps> = ({ user }) => {
  const setInviteModalState = useSetRecoilState(inviteModalState);
  const { directoryState } = useDirectory();

  return (
    <Flex alignItems="center" flexGrow={1}>
      <Box
        display={{ base: "none", md: "flex" }}
        alignItems="center"
        borderRight="1px solid"
        borderColor="gray.200"
      >

        {directoryState.selectedMenuItem !== defaultMenuItem && (<Button
          variant="solid"
          height="33px"
          fontSize="13pt"
          fontWeight={600}
          leftIcon={<BsPersonFillAdd />}
          display={{ base: "none", sm: "flex" }}
          width={{ base: "70px", md: "110px" }}
          mr={2}
          onClick={() => setInviteModalState({ open: true })}
        >
          <Text fontSize="11pt">Invite</Text>
        </Button>)}

        <Button
          variant="solid"
          height="33px"
          fontSize="11pt"
          bg="green.500"
          fontWeight={600}
          leftIcon={<FaCrown />}
          _hover={{ bg: "green.300" }}
          display={{ base: "none", sm: "flex" }}
          width={{ base: "70px", md: "110px" }}
          mr={2}
        >
          <Text fontSize="11pt"> Upgrade </Text>
        </Button>
      </Box>
      <>
        {/* <Flex
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: "gray.200" }}
        >
          <Icon as={CiBellOn} fontSize={30} />
        </Flex> */}
        <NotificationMenu user={user} />
        <Flex
          display={{ base: "none", md: "flex" }}
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: "gray.200" }}
        >
          <Icon as={CiChat2} fontSize={30} />
        </Flex>
        <Flex
          mr={3}
          ml={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: "gray.200" }}
        >
          <Icon as={CiSettings} fontSize={30} />
        </Flex>
      </>
    </Flex>
  );
};
export default ActionIcons;
