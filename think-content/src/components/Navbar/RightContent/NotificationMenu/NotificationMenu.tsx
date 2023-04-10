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
  Icon,
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import { getDocs, collection, Timestamp } from "firebase/firestore";
import moment from "moment";
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
