import { Workspace, workspaceState } from "@/src/atoms/workspacesAtom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Divider,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button,
  Box,
  useColorModeValue,
  Container,
  FormControl,
  FormLabel,
  useToast,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";

import {
  AsyncSelect,
  OptionBase,
  GroupBase,
  chakraComponents,
  LoadingIndicatorProps,
  useChakraSelectProps,
} from "chakra-react-select";
import { auth, db } from "@/src/firebase/firebase";
import {
  getDocs,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { User } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import useWorkspaceData from "@/src/hooks/useWorkspaceData";
import { useRecoilValue } from "recoil";
import MemberComponent from "./MemberComponent";

type InviteMembersModalProps = {
  open: boolean;
  handleClose: () => void;
  workspaceData: Workspace;
};

interface ColorOption extends OptionBase {
  label: string;
  value: User;
  color: string;
}

const asyncComponents = {
  LoadingIndicator: (
    props: LoadingIndicatorProps<ColorOption, true, GroupBase<ColorOption>>
  ) => {
    const { color, emptyColor } = useColorModeValue(
      {
        color: "blue.500",
        emptyColor: "blue.100",
      },
      {
        color: "blue.300",
        emptyColor: "blue.900",
      }
    );

    return (
      <chakraComponents.LoadingIndicator
        color={color}
        emptyColor={emptyColor}
        speed="750ms"
        spinnerSize="md"
        thickness="3px"
        {...props}
      />
    );
  },
};

const getUsers = async () => {
  const userDocs = await getDocs(collection(db, `users/`));
  const users = userDocs.docs.map((doc) => ({
    label: doc.data().email,
    value: doc.data() as User,
  }));
  return users;
};

const InviteMembersModal: React.FC<InviteMembersModalProps> = ({
  open,
  handleClose,
  workspaceData,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<ColorOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentUser] = useAuthState(auth);
  const toast = useToast();
  const members = useRecoilValue(workspaceState).memberSnippets;

  const selectProps = useChakraSelectProps({
    value: selectedOptions,
    onChange: setSelectedOptions,
    components: asyncComponents,
  });

  const handleSubmit = () => {
    if (error) setError("");
    setLoading(true);
    try {
      selectedOptions.forEach(async (user) => {
        console.log(workspaceData);
        await setDoc(
          doc(db, `users/${user.value.uid}/invites`, workspaceData.id),
          {
            workspaceId: workspaceData.id,
            workspaceName: workspaceData.name,
            invitedBy: currentUser?.email,
            invitedAt: serverTimestamp(),
          }
        );
      });
    } catch (error: any) {
      console.log("handleInviteMembers error", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal isOpen={open} onClose={handleClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display="flex"
            flexDirection="column"
            fontSize={15}
            padding={3}
          >
            Invite Your Team
          </ModalHeader>
          <Box pl={3} pr={3}>
            <Divider />
            <ModalBody display="flex" flexDirection="column" padding="10px 0px">
              <Container mb={16}>
                <FormControl p={4}>
                  <FormLabel>
                    {/* Custom <Code>LoadingIndicator</Code> */}
                  </FormLabel>

                  <AsyncSelect
                    {...selectProps}
                    isMulti
                    placeholder="Add group members..."
                    components={asyncComponents}
                    loadOptions={(inputValue, callback) => {
                      getUsers()
                        .then((data) =>
                          data.filter((i) =>
                            i.label
                              .toLowerCase()
                              .includes(inputValue.toLowerCase())
                          )
                        )
                        .then((data) => callback(data));
                      console.log(selectedOptions);
                    }}
                  />
                </FormControl>
                <Text
                  display="flex"
                  flexDirection="column"
                  fontSize={15}
                  fontWeight={700}
                >
                  Members
                </Text>
                {members.map((member) => (
                  <MemberComponent memberEmail={member.email} />
                ))}
              </Container>
            </ModalBody>
            <ModalCloseButton />
          </Box>
          <ModalFooter bg="gray.100" borderRadius="0px 0px 10px 10px">
            <Button
              variant="outline"
              height="30px"
              mr={3}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              height="30px"
              onClick={() => {
                handleSubmit();
                toast({
                  title: "Invitation Sent",
                  description: "We've notified your teamates.",
                  status: "success",
                  duration: 9000,
                  isClosable: true,
                });
              }}
              isLoading={loading}
            >
              Add Members
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default InviteMembersModal;
