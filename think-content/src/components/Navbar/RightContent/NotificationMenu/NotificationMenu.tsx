import { db } from "@/src/firebase/firebase";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  Flex,
  MenuList,
  MenuItem,
  Text,
  Stack,
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import { getDocs, collection, Timestamp } from "firebase/firestore";
import moment from "moment";
import React, { useState } from "react";

type NotificationMenuProps = {
  user: User;
};

interface notification {
  workspaceId: string;
  workspaceName: string;
  invitedBy: string;
  invitedAt: Timestamp;
}

const NotificationMenu: React.FC<NotificationMenuProps> = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState<notification[]>([]);
  const [error, setError] = useState();

  const getMyNotifications = async () => {
    setLoading(true);

    try {
      // get users invites
      const invitesDocs = await getDocs(
        collection(db, `users/${user?.uid}/invites`)
      );

      setNotifications(
        invitesDocs.docs.map((doc) => ({ ...doc.data() })) as notification[]
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
        cursor="pointer"
        mr={4}
        padding="0px 6px"
        borderRadius={4}
        _hover={{ bg: "blue.100", color: "blue.500" }}
        onClick={getMyNotifications}
      >
        <Flex align="center" display={{ base: "none", md: "flex" }}>
          <Flex align="center">
            <Text fontWeight={700} fontSize="12pt" color="blue.500">
              Notifications
            </Text>
          </Flex>
          <ChevronDownIcon color="blue.500" />
        </Flex>
      </MenuButton>
      <MenuList>
        {notifications.map((notif) => (
          <MenuItem key={notif.workspaceId}>
            <Stack spacing={0}>
              <Text fontSize={12}>
                "{notif.invitedBy}" invited you to the workspace "
                {notif.workspaceName}"
              </Text>
              <Text fontSize={11}>
                {moment(new Date(notif.invitedAt.seconds * 1000)).fromNow()}
              </Text>
            </Stack>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default NotificationMenu;