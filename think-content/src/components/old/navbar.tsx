import { useAuth } from "../context/AuthContext";
import React, { ReactNode, useState } from "react";
import { BsCodeSlash, BsPersonFill } from "react-icons/bs";
import SearchBar from "@/components/searchbar"
import { GeneralIcon } from "./sidebar";
import NavbarDropdown from "./navbar-dropdown";

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
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };
  return (
    <div className="z-30 ">
      <div className="fixed h-8 m-4 -my-4 overflow-hidden bg-gray-100"></div>

      {/* Main content */}
      <div className="fixed w-screen h-8 -mx-4 -my-6">
        {/* Top navbar */}
        <nav className="flex justify-between flex-shrink-0 p-4 bg-white border-b border-gray-200">
          <div className="items-start h-8">
            {/* Logo or app name */}
            <a href="/"className="justify-between text-xl font-bold text-gray-900 max-h-16">
              <img 
                className="inline-block w-64 rounded-xl hover:brightness-75"
                src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fs3.amazonaws.com%2Fappforest_uf%2Ff1676442290815x271826918285251970%2FSIX_34E406DC-877A-49A0-BE31-45D0B892DCBD%25203.PNG?w=384&h=51&auto=compress&dpr=1.25&fit=max" 
                alt="logo" 
              />
              
            </a>
          </div>
          <span className="hidden sm:inline-block">
            {/* Search bar */}
            <SearchBar value={searchValue} onChange={handleSearchChange} />
          </span>
          
          {/* Top navbar links */}
          <div className="flex items-center mx-8 space-x-6">
          <a href="/documentation" className="hidden text-gray-500 lg:inline-block hover:text-gray-900">
              Documentation
            </a>
            <a href={currentUser?.email ? "/workspace" : "/login"} className="hidden text-gray-500 lg:inline-block hover:text-gray-900">
              Workspace
            </a>
            <a href="/team" className="hidden text-gray-500 lg:inline-block hover:text-gray-900">
              Team
            </a>
            <a href="/billing" className="hidden text-gray-500 lg:inline-block hover:text-gray-900">
              Billing
            </a>
            <a href ="pricing" className="hidden px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg lg:inline-block hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50">
              Upgrade
            </a>
            <NavbarDropdown/>
            <a href={currentUser?.email ? "/profile" : "/login"} className="flex items-center justify-center text-gray-500 hover:text-gray-900">
            <ProfileIcon icon={<BsPersonFill size="32" />}/>
            <span className="hidden lg:inline-block">
              {currentUser?.email ? currentUser?.email : "Login"}
            </span>
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}