import useWorkspaceData from "@/src/hooks/useWorkspaceData";

const Home: React.FC = () => 
{
  const { workspaceStateValue } = useWorkspaceData();
  
  return <div>MAIN DASHBOARD</div>
}

export default Home;