import { workspaceState } from "@/src/atoms/workspacesAtom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Box,
  useColorModeValue,
  Container,
  FormControl,
  useToast,
  Text,
  Button,
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
  serverTimestamp,
  addDoc,
  query,
  where,
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

const InviteModal: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<ColorOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentUser] = useAuthState(auth);
  const workspaceStateValue = useRecoilValue(workspaceState);
  const [modalState, setModalState] = useRecoilState(inviteModalState);
  const toast = useToast();

  const getUsers = async () => {
    const userQuery = query(
      collection(db, "users"),
      where(
        "uid",
        "not-in",
        workspaceStateValue.memberSnippets.map(member => member.uid)
        ));

    const userDocs = await getDocs(userQuery);
    const users = userDocs.docs.map((doc) => ({
      label: doc.data().email,
      value: doc.data() as User,
    }));
    return users;
  };

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
          await addDoc(collection(db, `users/${user.value.uid}/invites`), {
            workspaceId: workspace.id,
            workspaceName: workspace.name,
            invitedBy: currentUser?.email,
            inviteEmail: user.value.email,
            invitedAt: serverTimestamp(),
          });
        });
      } catch (error: any) {
        console.log("handleInviteMembers error", error);
        setError(error.message);
      } finally {
        setLoading(false);
        handleClose();
        toast({
          title: 'Invitation Email Sent!',
          description: "Your teamates have been notified",
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
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
            <ModalBody display="flex" flexDirection="column" padding="10px 0px">
              <Container mb={16}>
                <FormControl p={4}>
                  <AsyncSelect<ColorOption, true, GroupBase<ColorOption>>
                    {...selectProps}
                    name="colors"
                    isMulti
                    placeholder="someone@email.com"
                    components={asyncComponents}
                    loadOptions={(inputValue, callback) => {
                      getUsers()
                        .then((data) =>
                          data.filter(
                            (i) =>
                              i.label
                                .toLowerCase()
                                .includes(inputValue.toLowerCase()) &&
                              !selectedOptions.find(
                                (option) => option.value.uid === i.value.uid
                              )
                          )
                        )
                        .then((data) => callback(data));
                    }}
                  />
                  <Button mt={3} mr={3} borderRadius={6} alignContent="right">Email Invite</Button>
                </FormControl>
                <Text
                  display="flex"
                  flexDirection="column"
                  fontSize={15}
                  fontWeight={700}
                  mt={7}
                  ml={3}
                >
                  Team
                </Text>
                {workspaceStateValue.memberSnippets.map((member) => (
                  <MemberComponent
                    memberEmail={member.email}
                    owner={workspaceStateValue.currentWorkspace?.owner}
                    memberId={member.uid}
                    key={member.email}
                  />
                ))}
              </Container>
            </ModalBody>
          </Box>
          <ModalFooter
            borderRadius="0px 0px 10px 10px"
            bg={useColorModeValue("brand.100", "brand.200")}
          >
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default InviteModal;
