import { Flex, Text } from "@chakra-ui/react";
import React from "react";

type MemberComponentProps = {
  memberEmail: string;
};

const MemberComponent: React.FC<MemberComponentProps> = ({ memberEmail }) => {
  return <Flex>
    <Text>
        {memberEmail}
    </Text>

  </Flex>;
};
export default MemberComponent;
