import CreatePostModal from "@/src/components/Modal/CreatePost/CreatePostModal";
import Posts from "@/src/components/Posts/Posts";
import { db } from "@/src/firebase/firebase";
import useWorkspaceData from "@/src/hooks/useWorkspaceData";
import { Button, Flex, Stack, Text } from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import type { GetServerSidePropsContext, NextPage } from "next";
import { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import safeJsonStringify from "safe-json-stringify";
import { Workspace, workspaceState } from "../../../atoms/workspacesAtom";

interface WorkspacePageProps {
  workspaceData: Workspace;
}

const WorkspacePage: NextPage<WorkspacePageProps> = ({ workspaceData }) => 
{
  const [openCreatePostModal, setOpenCreatePostModal] = useState(false);
  const [openInviteMembersModal, setOpenInviteMembersModal] = useState(false);
  // const { workspaceStateValue } = useWorkspaceData();
  const setWorkspaceStateValue = useSetRecoilState(workspaceState);
  const { getMembers } = useWorkspaceData();

  // workspace was not found in the database
  if (!workspaceData) {
    return <div> Not found</div>;
  }

  useEffect(() => {
    setWorkspaceStateValue((prev) => ({
      ...prev,
      currentWorkspace: workspaceData,
    }));

    // only update when workspace data is updated
  }, [workspaceData]);

  return (
    <div className="flex flex-col min-h-screen bg-blue-50">
      <Flex justify="center">
        <Stack align="center">
          <CreatePostModal
            open={openCreatePostModal}
            handleClose={() => setOpenCreatePostModal(false)}
          />
          <Button fontSize={15} width="50%" onClick={() => setOpenCreatePostModal(true)}>
            Create Post
          </Button>
          <Posts workspaceData={workspaceData} />
        </Stack>
      </Flex>
    </div>
  );
};

export default WorkspacePage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  console.log("GET SERVER SIDE PROPS RUNNING");

  try {
    const workspaceDocRef = doc(
      db,
      "workspaces",
      context.query.workspaceId as string
    );
    const workspaceDoc = await getDoc(workspaceDocRef);
    return {
      props: {
        workspaceData: workspaceDoc.exists()
          ? JSON.parse(
              safeJsonStringify({ id: workspaceDoc.id, ...workspaceDoc.data() }) // needed for dates
            )
          : "",
      },
    };
  } catch (error) {
    // Could create error page here
    console.log("getServerSideProps error - [workspace]", error);
  }
}
