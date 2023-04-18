import { workspaceState } from "@/src/atoms/workspacesAtom";
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
  addDoc,
} from "firebase/firestore";
import { User } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState, useRecoilValue } from "recoil";
import MemberComponent from "./MemberComponent";
import { inviteModalState } from "@/src/atoms/inviteModalAtom";

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

const InviteModal: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<ColorOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentUser] = useAuthState(auth);
  const workspaceStateValue = useRecoilValue(workspaceState);
  const [modalState, setModalState] = useRecoilState(inviteModalState);
  const toast = useToast();

  const selectProps = useChakraSelectProps({
    value: selectedOptions,
    onChange: setSelectedOptions,
  });

  const handleClose = () => {
    setModalState({
      open: false,
    });
  };

  const handleSubmit = () => {
    const workspace = workspaceStateValue.currentWorkspace;
    if (workspace) {
      if (error) setError("");
      setLoading(true);
      try {
        selectedOptions.forEach(async (user) => {
          await addDoc(

            collection(db, `users/${user.value.uid}/invites`),
            {
              workspaceId: workspace.id,
              workspaceName: workspace.name,
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
        handleClose();
      }
    }
  };

  return (
    <>
      <Modal isOpen={modalState.open} onClose={handleClose} size="lg">
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

                  <AsyncSelect<ColorOption, true, GroupBase<ColorOption>>
                    {...selectProps}
                    name="colors"
                    isMulti
                    placeholder="Add group members..."
                    components={asyncComponents}
                    loadOptions={(inputValue, callback) => {
                      getUsers()
                        .then((data) =>
                          data.filter(
                            (i) =>
                              i.label
                                .toLowerCase()
                                .includes(inputValue.toLowerCase()) &&
                              i.value.uid !== currentUser?.uid &&
                              !selectedOptions.find(
                                (option) => option.value.uid === i.value.uid
                              )
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
                {workspaceStateValue.memberSnippets.map((member) => (
                  <MemberComponent memberEmail={member.email} />
                ))}
              </Container>
            </ModalBody>
            <ModalCloseButton />
          </Box>
          <ModalFooter borderRadius="0px 0px 10px 10px" bg={useColorModeValue("gray.200", '#3C3C3C')}>
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

export default InviteModal;
