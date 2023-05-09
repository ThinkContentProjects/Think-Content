import useWorkspaceData from "@/src/hooks/useWorkspaceData";
import { useEffect } from "react";

const Home: React.FC = () => 
{
  useEffect(() => {
    // Call FB.getLoginStatus when the component mounts
    window.FB.getLoginStatus(function(response: any) {
      // Handle the response here
      if (response.status === 'connected') {
        // The user is logged in and has authorized your app
        const accessToken = response.authResponse.accessToken;
        console.log('User is logged in. Access Token:', accessToken);
      } else if (response.status === 'not_authorized') {
        // The user is logged in to Facebook, but has not authorized your app
        console.log('User is logged in but has not authorized the app');
      } else {
        // The user is not logged in to Facebook
        console.log('User is not logged in');
      }
    });
  }, []);

  const { workspaceStateValue } = useWorkspaceData();

  return <div className="flex flex-col min-h-screen bg-blue-50" />
}

export default Home;