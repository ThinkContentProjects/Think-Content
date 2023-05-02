import { workspaceState } from "@/src/atoms/workspacesAtom";
import useDirectory from "@/src/hooks/useDirectory";
import useWorkspaceData from "@/src/hooks/useWorkspaceData";
import { defaultMenuItem } from "@/src/atoms/directoryMenuAtom";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useRecoilValue } from "recoil";

type LeaveWorkspaceModalProps = {
  open: boolean;
  handleClose: () => void;
};

const LeaveWorkspaceModal: React.FC<LeaveWorkspaceModalProps> = ({
  open,
  handleClose,
}) => {
  const router = useRouter();
  const { leaveWorkspace } = useWorkspaceData();
  const workspaceStateValue = useRecoilValue(workspaceState);
  const { onSelectMenuItem } = useDirectory();
  const toast = useToast();

  return (
    <>
      <Modal isOpen={open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Leave this workspace?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>You will need to be invited again if you wish to rejoin.</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" variant="ghost" mr={3} onClick={handleClose}>
              Cancel
            </Button>
            <Button
              bg="red"
              borderRadius={10}
              onClick={() => {
                handleClose();
                router.push("/");
                onSelectMenuItem(defaultMenuItem);
                if (workspaceStateValue?.currentWorkspace)
                  leaveWorkspace(workspaceStateValue?.currentWorkspace);
                toast({
                  title: "Left Workspace!",
                  description: "You are no longer apart of the workspace",
                  status: "success",
                  duration: 9000,
                  isClosable: true,
                });
              }}
            >
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default LeaveWorkspaceModal;
