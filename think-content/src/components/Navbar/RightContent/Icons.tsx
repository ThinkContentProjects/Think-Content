import React, { useState } from "react";
import { Box, Button, Flex, Icon, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { BsPersonFillAdd } from "react-icons/bs";
import { useSetRecoilState } from "recoil";
import { inviteModalState } from "@/src/atoms/inviteModalAtom";
import { defaultMenuItem } from "@/src/atoms/directoryMenuAtom";
import useDirectory from "@/src/hooks/useDirectory";
import { FaRegGem } from "react-icons/fa";
import CreatePricingPlanModal from "../../Modal/PricingPlan/CreatePricingPlanModal";

type ActionIconsProps = {
  user: User;
};

const ActionIcons: React.FC<ActionIconsProps> = ({ user }) => {
  const setInviteModalState = useSetRecoilState(inviteModalState);
  const { directoryState } = useDirectory();
  const [openPricingPlan, setOpenPricingPlan] = useState(false);

  return (
    <>
      <CreatePricingPlanModal open={openPricingPlan} handleClose={() => setOpenPricingPlan(false)} />
      <Flex alignItems="center" flexGrow={1}>
        <Box
          display={{ base: "none", md: "flex" }}
          alignItems="center"
          // borderRight="1px solid"
          mr={3}
          borderColor="gray.200"
        >
          {directoryState.selectedMenuItem !== defaultMenuItem && (
            <Button
              variant="solid"
              height="33px"
              bg="#2589FF"
              fontSize="13pt"
              fontWeight={600}
              leftIcon={<BsPersonFillAdd />}
              display={{ base: "none", sm: "flex" }}
              width={{ base: "70px", md: "110px" }}
              mr={2}
              onClick={() => setInviteModalState({ open: true })}
            >
              <Text fontSize="11pt">Invite</Text>
            </Button>
          )}

          <Button
            variant="solid"
            height="33px"
            fontSize="11pt"
            fontWeight={600}
            display={{ base: "none", sm: "flex" }}
            width={{ base: "80px", md: "110px" }}
            mr={2}
            onClick={() => setOpenPricingPlan(true)}
          >
            <Text fontSize="11pt"> Upgrade </Text>
            <Icon as={FaRegGem} color={"white"} pl={1} boxSize={4}/>
          </Button>
        </Box>
      </Flex>
    </>

  );
};
export default ActionIcons;
