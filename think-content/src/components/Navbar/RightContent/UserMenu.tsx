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
  useColorModeValue,
} from "@chakra-ui/react";
import { signOut, User } from "firebase/auth";
import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { CiLogin, CiLogout, CiUser, CiUnlock } from "react-icons/ci";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { useRouter } from "next/router";
import { authModalState } from "@/src/atoms/authModalAtom";
import { workspaceState } from "@/src/atoms/workspacesAtom";
import { auth } from "@/src/firebase/firebase";
import { BsFillMoonFill } from "react-icons/bs";
import CreateProfileModal from "../../Modal/UserProfile/CreateProfileModal";
import CreatePricingPlanModal from "../../Modal/PricingPlan/CreatePricingPlanModal";

type UserMenuProps = {
  user?: User | null;
};

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const resetWorkspaceState = useResetRecoilState(workspaceState);
  const setAuthModalState = useSetRecoilState(authModalState);
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();
  const item_hover_bg = useColorModeValue("gray.100", "#27282A");
  const logout = async () => {
    router.push('/').then(async () => {await signOut(auth)});
    resetWorkspaceState();
  };
  const [openCreateProfileSettings, setOpenProfileSettings] = useState(false);
  const [openPricingPlan, setOpenPricingPlan] = useState(false);

  return (
    
    <Menu>
      <CreateProfileModal open={openCreateProfileSettings} handleClose={() => setOpenProfileSettings(false)} />
      <CreatePricingPlanModal open={openPricingPlan} handleClose={() => setOpenPricingPlan(false)} />
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
                <Icon fontSize={20} mr={1} as={FaUser} />

                <Flex
                  direction="column"
                  display={{ base: "none", lg: "flex" }}
                  fontSize="8pt"
                  align="flex-start"
                  mr={8}
                >
                  <Text fontSize='12pt' fontWeight={700}>
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
              _hover={{ bg: item_hover_bg }}
              onClick={() => setOpenProfileSettings(true)}
            >
              <Flex align="center" onClick={() => setOpenProfileSettings(true)}>
                <Icon fontSize={20} mr={2} as={CiUser} />
                Profile
              </Flex>
              <MenuDivider />
            </MenuItem>
            <MenuItem
              fontSize="11pt"
              fontWeight={500}
              _hover={{ bg: item_hover_bg }}
              onClick={() => setOpenPricingPlan(true)}
            >
              <Flex align="center" onClick={() => setOpenPricingPlan(true)}>
                <Icon fontSize={20} mr={2} as={CiUnlock} />
                Upgrade
              </Flex>
              <MenuDivider />
            </MenuItem>
            <MenuItem
              fontSize="11pt"
              fontWeight={500}
              _hover={{ bg: item_hover_bg }}
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
              _hover={{ bg: item_hover_bg }}
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
