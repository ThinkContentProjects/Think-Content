import useWorkspaceData from "@/src/hooks/useWorkspaceData";

const Home: React.FC = () => 
{
  const { workspaceStateValue } = useWorkspaceData();
  
  return <div>
    HELLO WORLD
  </div>
}

export default Home;