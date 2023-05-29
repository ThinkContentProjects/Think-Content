import { auth, db } from "@/src/firebase/firebase";
import useWorkspaceData from "@/src/hooks/useWorkspaceData";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import "react-tabs/style/react-tabs.css";
import { Icon } from "@chakra-ui/react";
import {
  MdAccountCircle,
  MdOutlinePayments,
  MdWorkspacesOutline,
} from "react-icons/md";
import AccountInformation from "./AccountInformation";
import Billing from "./Billing";
import BrandProfiles from "./BrandProfiles";
import { BrandProfile, brandProfileState } from "@/src/atoms/brandProfilesAtom";
import { useRecoilState } from "recoil";

type CreateProfileModalProps = {
  open: boolean;
  handleClose: () => void;
};

export type GenderType = "Male" | "Female" | "NotSpecified";

export type Boxes = {
  personaName: string;
  ageRangeLow: Number;
  ageRangeHigh: Number;
  gender: GenderType;
  painPoints: string;
};

const CreateProfileModal: React.FC<CreateProfileModalProps> = ({
  open,
  handleClose,
}) => {
  const [user] = useAuthState(auth);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [brandProfileStateValue, setBrandProfileStateValue] =
    useRecoilState(brandProfileState);

  const [boxes, setBoxes] = useState<
    {
      personaName: string;
      ageRangeLow: Number;
      ageRangeHigh: Number;
      gender: GenderType;
      painPoints: string;
    }[]
  >([]);

  const [brandInputs, setBrandInputs] = useState({
    name: "",
    mission: "",
    industry: "",
    message: "",
  });

  // update the brand react state on input field change
  const onBrandChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value },
    } = event;
    setBrandInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSaveChanges = async () => {
    // update brand profiles at 0 in the recoil state
    const updatedProfiles = [...brandProfileStateValue.brandProfiles];
    updatedProfiles[0] = {
      ...updatedProfiles[0],
      name: brandInputs.name,
      mission: brandInputs.mission,
      industry: brandInputs.industry,
      message: brandInputs.message,
    };
    
    setBrandProfileStateValue((prev) => ({
      ...prev,
      brandProfiles: updatedProfiles,
    }));
    const brandRef = doc(
      db,
      `users/${user?.uid}/brandProfiles`,
      brandProfileStateValue.brandProfiles[0].id
    );

    // update the database...
    await updateDoc(brandRef, {
      name: brandInputs.name,
      mission: brandInputs.mission,
      industry: brandInputs.industry,
      message: brandInputs.message,
    });
  };

  const getBrandProfiles = async () => {
    setLoading(true);

    try {
      // get users snippets
      const profileDocs = await getDocs(
        collection(db, `users/${user?.uid}/brandProfiles`)
      );

      // set the recoil state of the workspace atom, updating the snippets and setting snippetsFetched to true
      const profiles = profileDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as BrandProfile[];
      setBrandProfileStateValue((prev) => ({
        ...prev,
        brandProfiles: profiles,
      }));

      // set the input values
      if (profiles.length > 0) {
        const { id, industry, name, message, mission } = profiles[0];
        setBrandInputs({
          name: name,
          mission: mission,
          industry: industry,
          message: message,
        });
      }
    } catch (error: any) {
      console.log("getting brand profiles error", error);
      setError(error.message);
    }
    setLoading(false);
  };

  // load the brand profiles and set the recoil state..
  // although, this probably needs to be done elsewhere aswell...
  useEffect(() => {
    getBrandProfiles();
  }, []);

  return (
    <>
      <Modal isOpen={open} onClose={handleClose} size="6xl">
        <ModalOverlay />
        <ModalContent pl={8} pb={3} borderRadius="3xl" pt={4}>
          <ModalHeader fontSize={"2xl"}>
            Profile Settings
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            <Tabs variant="soft-rounded" size="sm" width="128" pt={30}>
              <Box display="flex">
                <Box
                  width="25%"
                  bg="#1E2022"
                  mx="auto"
                  w={200}
                  mr={10}
                  alignItems="flex-start"
                  borderRadius="xl"
                  h={"min"}
                >
                  <TabList
                    flexDirection="column"
                    alignItems="flex-start"
                    width="100%"
                  >
                    <Tab
                      fontSize="14"
                      fontWeight={"thin"}
                      color="#959697"
                      _selected={{ color: "white", bg: "#242628" }}
                      width="100%"
                      justifyContent="flex-start"
                      paddingLeft="1rem"
                    >
                      <Icon as={MdAccountCircle} boxSize={4} mr={2} />
                      Account Information
                    </Tab>
                    <Tab
                      fontSize="14"
                      fontWeight={"thin"}
                      color="#959697"
                      _selected={{ color: "white", bg: "#242628" }}
                      width="100%"
                      justifyContent="flex-start"
                      paddingLeft="1rem"
                    >
                      <Icon as={MdOutlinePayments} boxSize={4} mr={2} />
                      Billing
                    </Tab>
                    <Tab
                      fontSize="14"
                      fontWeight={"thin"}
                      color="#959697"
                      _selected={{ color: "white", bg: "#242628" }}
                      width="100%"
                      justifyContent="flex-start"
                      paddingLeft="1rem"
                    >
                      <Icon as={MdWorkspacesOutline} boxSize={4} mr={2} />
                      Brand Profiles
                    </Tab>
                  </TabList>
                </Box>
                <Box flex="1">
                  <TabPanels
                    alignItems="flex-start"
                    marginTop="-20"
                    marginLeft="16"
                  >
                    <TabPanel>
                      <AccountInformation />
                    </TabPanel>
                    <TabPanel>
                      <Billing />
                    </TabPanel>
                    <TabPanel>
                      <BrandProfiles
                        onBrandChange={onBrandChange}
                        brandInputs={brandInputs}
                        boxes={boxes}
                        setBoxes={setBoxes}
                      />
                    </TabPanel>
                  </TabPanels>
                </Box>
              </Box>
            </Tabs>
          </ModalBody>
          <ModalFooter>
            <Button
              fontSize={"xs"}
              fontWeight={"normal"}
              px={8}
              py={2}
              h="-moz-min-content"
              variant="unstyled"
              color="#1E2022"
              bg="#ffffff"
              _hover={{ color: "black", bg: "gray.300" }}
              onClick={() => {
                handleClose();
                onSaveChanges();
              }} //Need to update data once this button is clicked
            >
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateProfileModal;
