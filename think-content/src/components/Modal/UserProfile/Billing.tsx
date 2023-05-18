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
import CreateProfileModal from "./CreateProfileModal";


type BillingProps = {
    user?: User | null;
  };

const Billing: React.FC<BillingProps> = ({ user }) => {

    return (
        <>
            <Text fontSize="xl" fontWeight={"bold"}>
                Billing
            </Text>
        </>
    );

};

export default Billing;