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

const settings: React.FC<settingsProps> = () => {
  const { workspaceStateValue } = useWorkspaceData();
  // const setInviteModalState = useSetRecoilState(inviteModalState);

  return (
    <Flex display="flex" flexDirection="column" padding={16}>
      <VStack align="left" spacing={1} mb={10}>
        <Text fontSize="25pt" fontWeight={800}>
          Settings
        </Text>
        <Text>Update your workspce settings</Text>
      </VStack>
    </Flex>
    // <Flex
    //   justify="center"
    //   pt="100px"
    //   align="center"
    //   display="flex"
    //   flexDirection="column"
    // >
    //   <Stack>
    //     <Card width="700px" variant="elevated">
    //       <CardHeader>
    //         <Heading size="md">Update Workspace Settings</Heading>
    //       </CardHeader>

    //       <CardBody>
    //         <Stack divider={<StackDivider />} spacing="4">
    //           <Box>
    //             <Heading size="xs" textTransform="uppercase" pb={1}>
    //               Workspace Name
    //             </Heading>
    //             <Input
    //               placeholder="My workspace's name"
    //               value="Cool Workspace"
    //             ></Input>
    //           </Box>
    //           <Box>
    //             <Heading size="xs" textTransform="uppercase">
    //               Brand Profile
    //             </Heading>
    //             <Select pt="2" fontSize="sm">
    //               <option value="brand1">Brand 1</option>
    //               <option value="brand2">Brand 2</option>
    //               <option value="option3">Brand 3</option>
    //             </Select>
    //           </Box>
    //         </Stack>
    //       </CardBody>
    //       <CardFooter borderRadius="0px 0px 10px 10px">
    //         <Button mr={3}>Update</Button>
    //       </CardFooter>
    //     </Card>
    //     <Card width="700px">
    //       <CardHeader>
    //         <Stack direction="row">
    //           <Heading size="md">Workspace Members</Heading>
    //           <Button height="30px" onClick={() => setInviteModalState({ open: true })}>Invite</Button>
    //         </Stack>
    //       </CardHeader>

    //       <CardBody>
    //         <Stack divider={<StackDivider />} spacing="4">

    //         </Stack>
    //       </CardBody>
    //     </Card>
    //   </Stack>
    // </Flex>
  );
};

export default withProtected(settings);
