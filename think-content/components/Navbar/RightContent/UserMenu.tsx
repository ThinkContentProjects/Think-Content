import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Flex,
  Icon,
  MenuDivider,
  Text,
} from "@chakra-ui/react";
import { signOut, User } from "firebase/auth";
import React from "react";
import { FaCrown, FaUser } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogin } from "react-icons/md";
import { auth } from "@/firebase/firebase";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import { workspaceState } from "@/atoms/workspacesAtom";
import { useRouter } from "next/router";

type UserMenuProps = {
  user?: User | null;
};

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {

  const resetWorkspaceState = useResetRecoilState(workspaceState)
  const setAuthModalState = useSetRecoilState(authModalState);

  const router = useRouter();

  const logout = async () => {
    await signOut(auth);
    resetWorkspaceState();
  }

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
                <Icon
                  fontSize={20}
                  mr={1}
                  color="gray.300"
                  as={FaUser}
                />

                <Flex
                  direction="column"
                  display={{ base: 'none', lg:'flex'}}
                  fontSize='8pt'
                  align='flex-start'
                  mr={8}
                  >
                    <Text fontWeight={700}>
                      {user?.displayName || user.email?.split("@")[0]}
                    </Text>
                </Flex>
              </>
            ) : (
              <Icon fontSize={24} color="grey.400" mr={1} as={VscAccount} />
            )}
          </Flex>
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList>
        {user ? (
          <>
            <MenuItem
              fontSize="10pt"
              fontWeight={700}
              _hover={{ bg: "blue.500", color: "white" }}
            >
              <Flex align="center" onClick={() => router.push('/profile')}>
                <Icon fontSize={20} mr={2} as={CgProfile}/>
                Profile
              </Flex>
              <MenuDivider />
            </MenuItem>
            <MenuItem
              fontSize="10pt"
              fontWeight={700}
              _hover={{ bg: "blue.500", color: "white" }}
            >
              <Flex align="center">
                <Icon fontSize={18} mr={2} as={FaCrown} />
                Upgrade
              </Flex>
              <MenuDivider />
            </MenuItem>
            <MenuItem
              fontSize="10pt"
              fontWeight={700}
              _hover={{ bg: "blue.500", color: "white" }}
              onClick={logout}
            >
              <Flex align="center">
                <Icon fontSize={20} mr={2} as={MdOutlineLogin} />
                Logout
              </Flex>
            </MenuItem>
          </>
        ) : (
          <>
             <MenuItem
              fontSize="10pt"
              fontWeight={700}
              _hover={{ bg: "blue.500", color: "white" }}
              onClick={() => setAuthModalState({ open: true, view: "login"})}
            >
              <Flex align="center">
                <Icon fontSize={20} mr={2} as={MdOutlineLogin} />
                Log In / Sign Up
              </Flex>
            </MenuItem>
          </>
        )}
      </MenuList>
    </Menu>
  );
};

export default UserMenu;
