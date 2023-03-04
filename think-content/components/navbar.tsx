import { useAuth } from "../context/AuthContext";
import React, { ReactNode } from "react";
import { BsPersonFill } from "react-icons/bs";
import SearchBar from "@/components/searchbar"

interface ProfileIconProps {
  icon: ReactNode;
}


const ProfileIcon: React.FC<ProfileIconProps> = ({ icon}) => (
  <div className="relative z-10 flex justify-center w-12 h-12 rounded-full profile-icon">
    {icon}
  </div>
);



export default function Navbar() {
  const { currentUser } = useAuth();

  return (
    <div id="header">
      <div className="fixed h-screen m-8 -my-4 overflow-hidden bg-gray-100"></div>

      {/* Main content */}
      <div className="fixed flex-grow w-screen -mx-4 -my-6">
        {/* Top navbar */}
        <nav className="flex justify-between flex-shrink-0 p-4 bg-white border-b border-gray-200">
          <div className="flex items-start">
            {/* Logo or app name */}
            <a href="/"className="text-xl font-bold tracking-wider text-gray-900">ThinkContent</a>
          </div>

          {/* Search bar */}
          <SearchBar/>

          {/* Top navbar links */}
          <div className="flex items-center mx-8 space-x-6">
            <a href={currentUser?.email ? "/workspace" : "/login"} className="text-gray-500 hover:text-gray-900">
              Workspace
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900">
              Team
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900">
              Billing
            </a>
            <a href ="pricing" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50">
              Upgrade
            </a>
            <a href={currentUser?.email ? "/profile" : "/login"} className="flex items-center justify-center text-gray-500 hover:text-gray-900">
            <ProfileIcon icon={<BsPersonFill size="32" />}/>
            <span className="hidden sm:hidden md:hidden lg:inline-block xl:inline-block">
              {currentUser?.email ? currentUser?.email : "Login"}
            </span>
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}
