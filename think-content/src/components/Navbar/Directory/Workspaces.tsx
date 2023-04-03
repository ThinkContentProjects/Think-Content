import { workspaceState } from "@/src/atoms/workspacesAtom";
import { MenuItem, Flex, Icon, Box, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { GrAdd } from "react-icons/gr";
import { useRecoilValue } from "recoil";
import MenuListItem from "./MenuListItem";
import { FaSquareFull } from 'react-icons/fa';
import CreateWorkspaceModal from "../../Modal/CreateWorkspace/CreateWorkspaceModal";

type WorkspacesProps = {};

const Workspaces: React.FC<WorkspacesProps> = () => {
  const [open, setOpen] = useState(false);
  const mySnippets = useRecoilValue(workspaceState).mySnippets;

  return (
    <>
      <CreateWorkspaceModal open={open} handleClose={() => setOpen(false)} />
      <Box mt={3} mb={4}>
        <Text pl={3} mb={1} fontSize="8pt" fontWeight={500} color="gray.500">
          YOUR WORKSPACES
        </Text>
      </Box>
      <MenuItem
        width="100%"
        fontSize="10pt"
        _hover={{ bg: "gray.100" }}
        onClick={() => setOpen(true)}
      >
        <Flex align="center">
          <Icon fontSize={20} mr={2} as={GrAdd}></Icon>
          Create Workspace
        </Flex>
      </MenuItem>
      {mySnippets.map((snippet) => (
        <MenuListItem
          key={snippet.workspaceId}
          icon={FaSquareFull}
          displayText={snippet.workspaceId}
          link={`/workspace/${snippet.workspaceId}`}
          iconColor='blue.500'
          imageURL={snippet.imageURL}
        />
      ))}
    </>
  );
};
export default Workspaces;
