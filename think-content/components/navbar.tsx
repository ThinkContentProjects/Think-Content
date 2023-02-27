import { useAuth } from '../context/AuthContext';
import React, { ReactNode, useState } from 'react';
import { IconBase } from 'react-icons';
import { BsPersonBadge, BsPersonFill } from 'react-icons/bs';

interface ProfileIconProps {
  icon: ReactNode;
}


const ProfileIcon: React.FC<ProfileIconProps> = ({ icon}) => (
  <div className='relative z-10 flex justify-center w-12 h-12 rounded-full profile-icon'>
    {icon}
  </div>
);

function removeEmail(str: string): string {
  const atIndex = str.indexOf('@');
  if (atIndex !== -1) {
    return str.slice(0, atIndex);
  }
  return str;
}


export default function Navbar() {
  const { currentUser } = useAuth();
  const [isSearching, setIsSearching] = useState(false);


  const handleSearch = () => {
    setIsSearching(!isSearching);
  };

  return (
    <div id='header'>
      <div className='fixed h-screen m-8 -my-4 overflow-hidden bg-gray-100'></div>

      {/* Main content */}
      <div className='fixed flex-grow w-screen -mx-4 -my-6'>
        {/* Top navbar */}
        <nav className='flex justify-between flex-shrink-0 p-4 bg-white border-b border-gray-200'>
          <div className='flex items-start'>
            {/* Logo or app name */}
            <a href='/'className='text-xl font-bold tracking-wider text-gray-900'>Think.Content</a>
          </div>

          {/* Search bar */}
          <div className='relative items-center justify-center w-full max-w-sm mx-4'>
            <span className='absolute inset-y-auto left-0 items-center justify-center flex-auto pt-2 pl-3 '>
              <svg
                className={`h-6 w-6 ${
                  isSearching ? 'text-gray-500' : 'text-gray-500'
                }`}
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                onClick={handleSearch}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d={isSearching ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </span>
            <input
              className={`bg-gray-100 block w-full pl-10 pr-3 py-2 rounded-md ${
                isSearching ? 'border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm' : ''
              }`}
              type='text'
              placeholder='Search'
              onClick={handleSearch}
            />
          </div>

          {/* Top navbar links */}
          <div className='flex items-center mx-8 space-x-6'>
            <a href='#' className='text-gray-500 hover:text-gray-900'>
              Dashboard
            </a>
            <a href='#' className='text-gray-500 hover:text-gray-900'>
              Projects
            </a>
            <a href='#' className='text-gray-500 hover:text-gray-900'>
              Team
            </a>
            <a href='#' className='text-gray-500 hover:text-gray-900'>
              Billing
            </a>
            <a href ='pricing' className='px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50'>
              Upgrade
            </a>
            <a href={currentUser?.email ? '/profile' : '/login'} className='flex items-center justify-center text-gray-500 hover:text-gray-900'>
            <ProfileIcon icon={<BsPersonFill size='32' />}/>
            <span className='hidden sm:hidden md:hidden lg:inline-block xl:inline-block'>
              {currentUser?.email ? currentUser?.email : 'Login'}
            </span>
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}
