import { Flex, Text, Stack } from "@chakra-ui/react";
import React from "react";

type MemberComponentProps = {
  memberEmail: string;
  memberId: string;
  owner: string;
};

const MemberComponent: React.FC<MemberComponentProps> = ({ memberEmail, owner, memberId }) => {
  return (<Flex justify="space-between" margin={3}>
    <Text>{memberEmail}</Text>
    {owner == memberId ? <Text>Owner</Text> : <Text>Editor</Text>}
  </Flex>)
};

export default MemberComponent;