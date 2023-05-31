import { inviteModalState } from "@/src/atoms/inviteModalAtom";
import { withProtected } from "@/src/hooks/routes";
import useWorkspaceData from "@/src/hooks/useWorkspaceData";
import {
  Input,
  Select,
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  Flex,
  Button,
  CardFooter,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useSetRecoilState } from "recoil";

type settingsProps = {};

const Settings: React.FC<settingsProps> = () => {
  const { workspaceStateValue } = useWorkspaceData();
  // const setInviteModalState = useSetRecoilState(inviteModalState);

  return (
    <Flex display="flex" flexDirection="column" padding={16}>
      <VStack align="left" spacing={1} mb={10}>
        <Text fontSize="25pt" fontWeight={800}>
          Settings
        </Text>
        <Text>Update your workspace settings</Text>
      </VStack>
    </Flex>
  );
};

export default withProtected(Settings);
