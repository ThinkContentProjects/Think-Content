import { workspaceState } from "@/src/atoms/workspacesAtom";
import { MenuItem, Flex, Icon, Box, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useRecoilValue, useSetRecoilState } from "recoil";
import MenuListItem from "./MenuListItem";
import CreateWorkspaceModal from "../../Modal/CreateWorkspace/CreateWorkspaceModal";
import useDirectory from "@/src/hooks/useDirectory";
import { defaultMenuItem } from "@/src/atoms/directoryMenuAtom";
import { BsPersonFillAdd } from "react-icons/bs";
import { MdSettings } from "react-icons/md";
import { inviteModalState } from "@/src/atoms/inviteModalAtom";
import { BiExit } from "react-icons/bi";
import { useRouter } from "next/router";
import useWorkspaceData from "@/src/hooks/useWorkspaceData";
import LeaveWorkspaceModal from "../../Modal/LeaveWorkspace/LeaveWorkspaceModal";

const Workspaces: React.FC = () => {
  const [openCreateWorkspace, setOpenCreateWorkspace] = useState(false);
  const [openLeaveWorkspace, setOpenLeaveWorkspace] = useState(false);
  const workspaceStateValue = useRecoilValue(workspaceState);
  const { directoryState, ToggleMenuOpen } = useDirectory();
  const { leaveWorkspace } = useWorkspaceData();
  const setInviteModalState = useSetRecoilState(inviteModalState);
  const router = useRouter();
  const { onSelectMenuItem } = useDirectory();

  return (
    <>
      {directoryState.selectedMenuItem !== defaultMenuItem && (
        <>
          {/* <MenuItem
            width="100%"
            fontSize="10pt"
            onClick={() => {ToggleMenuOpen(); setInviteModalState({ open: true })}}
          >
            <Flex align="center">
              <Icon fontSize={20} mr={2} as={BsPersonFillAdd}></Icon>
              Invite Members
            </Flex>
          </MenuItem> */}
          {/* <MenuItem
            width="100%"
            fontSize="10pt"
            onClick={() =>
              {router.push(
                `/workspace/${workspaceStateValue?.currentWorkspace?.id}/settings`
              )
              ToggleMenuOpen()}
            }
          >
            <Flex align="center">
              <Icon fontSize={20} mr={2} as={MdSettings}></Icon>
              Settings
            </Flex>
          </MenuItem> */}
          {/* <MenuItem
            width="100%"
            fontSize="10pt"
            onClick={() => {setOpenLeaveWorkspace(true); ToggleMenuOpen()}}
          >
            <Flex align="center">
              <Icon fontSize={20} mr={2} as={BiExit}></Icon>
              Leave
            </Flex>
          </MenuItem> */}
        </>
      )}
      <CreateWorkspaceModal open={openCreateWorkspace} handleClose={() => setOpenCreateWorkspace(false)} />
      <LeaveWorkspaceModal open={openLeaveWorkspace} handleClose={() => setOpenLeaveWorkspace(false)} />
      <Box mt={3} mb={4}>
        <Text pl={3} mb={1} fontSize="8pt" fontWeight={500} color="gray.500">
          YOUR WORKSPACES
        </Text>
      </Box>
      <MenuItem width="100%" fontSize="10pt" onClick={() => {setOpenCreateWorkspace(true); ToggleMenuOpen()}}>
        <Flex align="center">
          <Icon fontSize={20} mr={2} as={AiOutlinePlus}></Icon>
          Create Workspace
        </Flex>
      </MenuItem>
      {workspaceStateValue.mySnippets.map((snippet) => (
        <MenuListItem
          key={snippet.workspaceId}
          displayText={snippet.workspaceName}
          link={`/workspace/${snippet.workspaceId}`}
        />
      ))}
    </>
  );
};

export default Workspaces;
