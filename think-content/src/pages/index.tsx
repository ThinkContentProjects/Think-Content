import { workspaceState } from "@/src/atoms/workspacesAtom";
import useWorkspaceData from "@/src/hooks/useWorkspaceData";
import { NextPage } from "next";

const Home: NextPage = () => 
{
  const { workspaceStateValue } = useWorkspaceData();

  return <div className="flex flex-col min-h-screen bg-blue-50" />
}

export default Home;