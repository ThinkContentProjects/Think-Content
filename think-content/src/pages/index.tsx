import useWorkspaceData from "@/src/hooks/useWorkspaceData";

const Home: React.FC = () => 
{
  const { workspaceStateValue } = useWorkspaceData();

  return <div className="flex flex-col min-h-screen bg-blue-50" />
}

export default Home;