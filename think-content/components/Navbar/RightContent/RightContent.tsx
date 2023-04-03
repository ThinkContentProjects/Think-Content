import { Flex, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { Router } from "next/router";
import React from "react";
import AuthModal from "../../Modal/Auth/AuthModal";
import AuthButtons from "./AuthButtons";
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
      <Flex justify="center" align="center">
        {user ? (
          <Icons />
        ) : (
          <>
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
