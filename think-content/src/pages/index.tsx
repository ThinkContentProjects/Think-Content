import useWorkspaceData from "@/src/hooks/useWorkspaceData";

const Home: React.FC = () => 
{
  const { workspaceStateValue } = useWorkspaceData();
  
  return <div>Landing Page</div>
}

export default Home;