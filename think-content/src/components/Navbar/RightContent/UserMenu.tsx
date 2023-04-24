import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  Icon,
  MenuDivider,
  Text,
  Switch,
  useColorMode,
  Button,
} from "@chakra-ui/react";
import { signOut, User } from "firebase/auth";
import React from "react";
import { FaUser } from "react-icons/fa";
import { CiLogin, CiLogout, CiUser, CiUnlock } from "react-icons/ci";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { useRouter } from "next/router";
import { authModalState } from "@/src/atoms/authModalAtom";
import { workspaceState } from "@/src/atoms/workspacesAtom";
import { auth } from "@/src/firebase/firebase";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";

type UserMenuProps = {
  user?: User | null;
};

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const resetWorkspaceState = useResetRecoilState(workspaceState);
  const setAuthModalState = useSetRecoilState(authModalState);
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();

  const logout = async () => {
    await signOut(auth);
    resetWorkspaceState();
  };

  return (
    <Menu>
      <MenuButton
        cursor="pointer"
        padding="0px 6px"
        borderRadius={4}
        _hover={{ outline: "1px solid", outlineColor: "grey.200" }}
      >
        <Flex align="center">
          <Flex align="center">
            {user ? (
              <>
                <Icon fontSize={20} mr={1} color="gray.300" as={FaUser} />

                <Flex
                  direction="column"
                  display={{ base: "none", lg: "flex" }}
                  fontSize="8pt"
                  align="flex-start"
                  mr={8}
                >
                  <Text fontWeight={700}>
                    {user?.displayName || user.email?.split("@")[0]}
                  </Text>
                </Flex>
              </>
            ) : (
              <Icon fontSize={24} color="grey.400" mr={1} as={CiUser} />
            )}
          </Flex>
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList>
        {user ? (
          <>
            <MenuItem
              fontSize="11pt"
              fontWeight={500}
              _hover={{ bg: "purple.700", color: "white" }}
            >
              <Flex align="center" onClick={() => router.push("/profile")}>
                <Icon fontSize={20} mr={2} as={CiUser} />
                Profile
              </Flex>
              <MenuDivider />
            </MenuItem>
            <MenuItem
              fontSize="11pt"
              fontWeight={500}
              _hover={{ bg: "purple.700", color: "white" }}
            >
              <Flex align="center">
                <Icon fontSize={20} mr={2} as={CiUnlock} />
                Upgrade
              </Flex>
              <MenuDivider />
            </MenuItem>
            <MenuItem
              fontSize="11pt"
              fontWeight={500}
              _hover={{ bg: "purple.700", color: "white" }}
              onClick={logout}
            >
              <Flex align="center">
                <Icon fontSize={20} mr={2} as={CiLogout} />
                Logout
              </Flex>
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem
              fontSize="11pt"
              fontWeight={500}
              _hover={{ bg: "purple.700", color: "white" }}
              onClick={() => setAuthModalState({ open: true, view: "login" })}
            >
              <Flex align="center">
                <Icon fontSize={20} mr={2} as={CiLogin} />
                Log In / Sign Up
              </Flex>
            </MenuItem>
          </>
        )}
        <MenuItem closeOnSelect={false} >
          <Switch onChange={toggleColorMode} isChecked={colorMode === "dark"}>
              <Icon as={BsFillMoonFill} />
          </Switch>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserMenu;
