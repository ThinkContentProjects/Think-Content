import React, { useEffect, useState } from "react";
import { withProtected } from "@/src/hooks/routes";
import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { auth, db } from "@/src/firebase/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import useWorkspaceData from "@/src/hooks/useWorkspaceData";

const index: NextPage = () => {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const { joinWorkspace } = useWorkspaceData();
  const [invites, setInvites] = useState<String[]>([]);

  // delete all the invitations for the workspace
  const deleteInvites = async () => {
    try {
      invites.forEach(async (inviteId) => {
        console.log("ID" + inviteId)
        await deleteDoc(doc(db, `users/${user?.uid}/invites/${inviteId}`));
      });
    } catch (error: any) {
      console.log("delete invitation error", error);
    }
  };

  const getInvites = async () => {
    try {
      const invitesQuery = query(
        collection(db, `users/${user?.uid}/invites/`),
        where("workspaceId", "==", router.query.workspaceId as string)
      );

      const inviteDocs = await getDocs(invitesQuery);

      if (inviteDocs.docs.length == 0) {
        router.replace("/");
      } else {
        const inviteList = inviteDocs.docs.map((doc) => doc.id);
        setInvites(inviteList);
      }
    } catch (error) {
      console.log("getInvites", error);
    } finally {
    }
  };

  useEffect(() => {
    if (user && !loading) {
      getInvites();
    }
  }, [user, loading]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Workspace Invitation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            You have been invited to join a workspace. Would you like to accept
            the invitation?
          </ModalBody>

          <ModalFooter>
            <Button
              mr={3}
              onClick={() => {
                onClose;
                deleteInvites();
              }}
              variant="ghost"
            >
              Decline
            </Button>
            <Button
              onClick={() => {
                deleteInvites();
                joinWorkspace(router.query.workspaceId as string);
                router.push(`/workspace/${router.query.workspaceId}`);
              }}
            >
              Accept
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default withProtected(index);
