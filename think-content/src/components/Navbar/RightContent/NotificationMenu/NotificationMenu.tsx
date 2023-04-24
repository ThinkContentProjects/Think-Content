import { db } from "@/src/firebase/firebase";
import useWorkspaceData from "@/src/hooks/useWorkspaceData";

import {
  Menu,
  MenuButton,
  Flex,
  MenuList,
  MenuItem,
  Text,
  Stack,
  Icon,
  MenuGroup,
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import {
  getDocs,
  collection,
  Timestamp,
  deleteDoc,
  doc,
} from "firebase/firestore";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { CiBellOn } from "react-icons/ci";

type NotificationMenuProps = {
  user: User;
};

interface notification {
  workspaceId: string;
  workspaceName: string;
  invitedBy: string;
  invitedAt: Timestamp;
  notificationId: string;
}

const NotificationMenu: React.FC<NotificationMenuProps> = ({ user }) => 
{
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState<notification[]>([]);
  const [error, setError] = useState("");
  const router = useRouter();
  const { joinWorkspace } = useWorkspaceData();

  // used in two places, should be moved into a hook!
  const getMyNotifications = async () => {
    setLoading(true);
    setError('');

    try {
      // get users invites
      const invitesDocs = await getDocs(
        collection(db, `users/${user?.uid}/invites`)
      );

      setNotifications(
        invitesDocs.docs.map((doc) => ({
          notificationId: doc.id,
          ...doc.data(),
        })) as notification[]
      );

      console.log("here are the invitations", notifications);
    } catch (error: any) {
      console.log("getMySnippets error", error);
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <Menu>
      <MenuButton
        onClick={getMyNotifications}
        mr={1.5}
        ml={1.5}
        padding={1}
        cursor="pointer"
        borderRadius={4}
        _hover={{ bg: "gray.200" }}
      >
        <Flex>
          <Icon as={CiBellOn} fontSize={30} />
        </Flex>
      </MenuButton>
      <MenuList>
      <MenuGroup title='Notifications'>
        {notifications.length > 0 ? (
          notifications.map((notif) => (
            <MenuItem
              key={notif.workspaceId}
              onClick={() => {
                router.push(`/invite/${notif.workspaceId}`);
              }}
            >
              <Stack spacing={0}>
                <Text fontSize={13}>
                  "{notif.invitedBy}" invited you to the workspace "
                  {notif.workspaceName}"
                </Text>
                <Text fontSize={11}>
                  {moment(new Date(notif.invitedAt.seconds * 1000)).fromNow()}
                </Text>
              </Stack>
            </MenuItem>
          ))
        ) : (
          <MenuItem as={Flex}>
            <Stack align="center" width="300px">
              <Icon fontSize={35} as={CiBellOn}></Icon>
              <Text fontWeight={700} fontSize={13}>You don't have any alerts.</Text>
              <Text fontSize={12} color="gray.500" align="center">
                New Notifications will appear here when there's activity in your
                workspace.
              </Text>
            </Stack>
          </MenuItem>
        )}
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};

export default NotificationMenu;
