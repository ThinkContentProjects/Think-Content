import { Flex, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { Router } from "next/router";
import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import AuthModal from "../../Modal/Auth/AuthModal";
import InviteModal from "../../Modal/Invite/InviteModal";
import AuthButtons from "./AuthButtons";
import FeaturesMenu from "./FeaturesMenu";
import Icons from "./Icons";
import Pricing from "./Pricing";
import ResourceMenu from "./ResourceMenu";
import UserMenu from "./UserMenu";

type RightContentProps = {
  user?: User | null;
};

const RightContent: React.FC<RightContentProps> = ({ user }) => {
  return (
    <>
      <AuthModal />
      <InviteModal />
      <Flex justify="center" align="center">
        {user ? (
          <Icons user={user}/>
        ) : (
          <>
            <FeaturesMenu />
            <ResourceMenu />
            <Pricing />
            <AuthButtons />
          </>
        )}
        <UserMenu user={user} />
      </Flex>
    </>
  );
};
export default RightContent;
