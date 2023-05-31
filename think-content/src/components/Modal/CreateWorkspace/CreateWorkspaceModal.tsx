// TO DO: get rid of getMySnippets when changing routes after creating a new workspace (shouldnt be needed?)

import { BrandProfile, brandProfileState } from "@/src/atoms/brandProfilesAtom";
import { auth, db } from "@/src/firebase/firebase";
import useBrandProfileData from "@/src/hooks/useBrandProfileData";
import useWorkspaceData from "@/src/hooks/useWorkspaceData";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  Divider,
  Text,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import {
  collection,
  doc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";

type CreateWorkspaceModalProps = {
  open: boolean;
  handleClose: () => void;
};

const CreateWorkspaceModal: React.FC<CreateWorkspaceModalProps> = ({
  open,
  handleClose,
}) => {
  const [user] = useAuthState(auth);
  const [workspaceName, setWorkspaceName] = useState("");
  const [charsRemaining, setCharsRemaining] = useState(21);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();
  const { getMySnippets } = useWorkspaceData();

  const { brandProfileStateValue } = useBrandProfileData();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 21) return;
    setWorkspaceName(event.target.value);
    // recalculate how many chars we have left
    setCharsRemaining(21 - event.target.value.length);
  };

  const handleCreateWorkspace = async () => {
    if (error) setError("");
    // validate the workspace name
    if (workspaceName.length < 3) {
      setError("Workspace names must be between 3 and 21 characters!");
      return;
    }

    // console.log(selectedBrandProfile);

    setLoading(true);

    // should be inside try block?
    const workspaceDocRef = doc(collection(db, "workspaces"));

    try {
      await runTransaction(db, async (transaction) => {
        // async not needed for transaction sets, but we need them for transaction gets
        // create workspace
        transaction.set(workspaceDocRef, {
          creatorId: user?.uid,
          name: workspaceName,
          createdAt: serverTimestamp(),
          numberOfMembers: 1,
          members: [user?.uid],
          owner: user?.uid,
          brandProfile: {
            name: brandProfileStateValue.brandProfiles[0].name,
            industry: brandProfileStateValue.brandProfiles[0].industry,
            mission: brandProfileStateValue.brandProfiles[0].mission,
            message: brandProfileStateValue.brandProfiles[0].message,
          },
        });

        // create workspace snippet for the user
        // collection/document/collection....
        transaction.set(
          doc(db, `users/${user?.uid}/workspaceSnippets`, workspaceDocRef.id),
          {
            workspaceId: workspaceDocRef.id,
            workspaceName: workspaceName,
            isOwner: true,
            numMembers: 1,
          }
        );
      });
    } catch (error: any) {
      console.log("handleCreateWorkspace error", error);
      setError(error.message);
    }
    handleClose();
    setLoading(false);
    toast({
      title: "Workspace Created.",
      description: "Here is your new workspace!",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    /*
      Pretty sure I should'nt need to call this here...
    */
    getMySnippets();
    router.push(`/workspace/${workspaceDocRef.id}`);
  };

  return (
    <>
      <Modal isOpen={open} onClose={handleClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display="flex"
            flexDirection="column"
            fontSize={20}
            padding={3}
          >
            Create a Workspace
          </ModalHeader>
          <Box pl={3} pr={3}>
            <Divider />
            <ModalBody display="flex" flexDirection="column" padding="10px 0px">
              <Text fontWeight={600} fontSize={18}>
                Name
              </Text>
              <Text fontSize={13} color="gray.500">
                Workspace names cannot be changed
              </Text>
              <Input value={workspaceName} size="sm" onChange={handleChange} />
              <Text
                fontSize="9pt"
                color={charsRemaining === 0 ? "red" : "gray.500"}
              >
                {charsRemaining} Characters remaining
              </Text>
              <Text fontSize="9pt" color="red" pt={1}>
                {error}
              </Text>
              <Text fontWeight={600} fontSize={18}>
                Brand Profile
              </Text>
              <Text fontSize={13} color="gray.500">
                This can be changed in the workspace settings
              </Text>
              <Select variant="filled">
                {brandProfileStateValue.brandProfiles.map(
                  (profile: BrandProfile) => (
                    <option
                      style={{ backgroundColor: "#191A1D" }}
                      value={profile.id}
                      key={profile.id}
                    >
                      {profile.name}
                    </option>
                  )
                )}
              </Select>
            </ModalBody>
            <ModalCloseButton id={"Close Button"}/>
          </Box>
          <ModalFooter borderRadius="0px 0px 10px 10px">
            <Button
              id="CancelButton"
              variant="outline"
              height="30px"
              mr={3}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              height="30px"
              onClick={handleCreateWorkspace}
              isLoading={loading}
              id="CreateWorkspaceButton"
            >
              Create Workspace
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateWorkspaceModal;
