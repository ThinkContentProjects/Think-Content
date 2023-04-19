import { workspaceState } from "@/src/atoms/workspacesAtom";
import { MenuItem, Flex, Icon, Box, Text, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useRecoilValue, useSetRecoilState } from "recoil";
import MenuListItem from "./MenuListItem";
import { FaSquareFull } from "react-icons/fa";
import CreateWorkspaceModal from "../../Modal/CreateWorkspace/CreateWorkspaceModal";
import useDirectory from "@/src/hooks/useDirectory";
import { defaultMenuItem } from "@/src/atoms/directoryMenuAtom";
import { BsPersonFillAdd } from "react-icons/bs";
import { MdSettings } from "react-icons/md";
import { inviteModalState } from "@/src/atoms/inviteModalAtom";
import { BiExit } from "react-icons/bi";
import { useRouter } from "next/router";
import useWorkspaceData from "@/src/hooks/useWorkspaceData";

type WorkspacesProps = {};

const Workspaces: React.FC<WorkspacesProps> = () => {
  const [open, setOpen] = useState(false);
  const workspaceStateValue = useRecoilValue(workspaceState);
  const { directoryState } = useDirectory();
  const { leaveWorkspace } = useWorkspaceData();
  const setInviteModalState = useSetRecoilState(inviteModalState);
  const router = useRouter();
  const { onSelectMenuItem } = useDirectory();

  return (
    <>
      {directoryState.selectedMenuItem !== defaultMenuItem && (
        <>
          <MenuItem
            width="100%"
            fontSize="10pt"
            // _hover={{ bg: "gray.100" }}
            closeOnSelect
            onClick={() => setInviteModalState({ open: true })}
          >
            <Flex align="center">
              <Icon fontSize={20} mr={2} as={BsPersonFillAdd}></Icon>
              Invite Members
            </Flex>
          </MenuItem>
          <MenuItem
            width="100%"
            fontSize="10pt"
            // _hover={{ bg: "gray.100" }}
            onClick={() => router.push(`/workspace/${workspaceStateValue?.currentWorkspace?.id}/settings`)}
          >
            <Flex align="center">
              <Icon fontSize={20} mr={2} as={MdSettings}></Icon>
              Settings
            </Flex>
          </MenuItem>
          <MenuItem
            width="100%"
            fontSize="10pt"
            // _hover={{ bg: "gray.100" }}
            onClick={() => {
              router.push("/");
              onSelectMenuItem(defaultMenuItem);
              leaveWorkspace(workspaceStateValue?.currentWorkspace);
            }}
          >
            <Flex align="center">
              <Icon fontSize={20} mr={2} as={BiExit}></Icon>
              Leave
            </Flex>
          </MenuItem>
        </>
      )}
      <CreateWorkspaceModal open={open} handleClose={() => setOpen(false)} />
      <Box mt={3} mb={4}>
        <Text pl={3} mb={1} fontSize="8pt" fontWeight={500} color="gray.500">
          YOUR WORKSPACES
        </Text>
      </Box>
      <MenuItem
        width="100%"
        fontSize="10pt"
        onClick={() => setOpen(true)}
      >
        <Flex align="center">
          <Icon fontSize={20} mr={2} as={AiOutlinePlus}></Icon>
          Create Workspace
        </Flex>
      </MenuItem>
      {workspaceStateValue.mySnippets.map((snippet) => (
        <MenuListItem
          key={snippet.workspaceId}
          icon={FaSquareFull}
          displayText={snippet.workspaceName}
          link={`/workspace/${snippet.workspaceId}`}
          iconColor="blue.500"
          imageURL={snippet.imageURL}
        />
      ))}
    </>
  );
};

export default Workspaces;
