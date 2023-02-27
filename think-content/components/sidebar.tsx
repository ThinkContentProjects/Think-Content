import React, { useState } from 'react';
import { ReactNode } from 'react';
import { BsPlus, BsInstagram, BsLinkedin } from 'react-icons/bs';
import { FaChevronDown, FaLightbulb, FaTwitter } from 'react-icons/fa';

interface SideBarIconProps {
  icon: ReactNode;
  text?: string;
}

interface CollapseIconProps {
  icon: ReactNode;
}

const SideBarIcon: React.FC<SideBarIconProps> = ({ icon, text = 'tooltip!' }) => (
  <div className='relative z-10 flex justify-center w-12 h-12 sidebar-icon group'>
    {icon}
    <span className='transform opacity-0 sidebar-tooltip right-8 group-hover:opacity-100'>
      {text}
    </span>
  </div>
);

const CollapseIcon: React.FC<CollapseIconProps> = ({icon}) => (
  <div className='z-10 group'>
    {icon}
  </div>
);

export default function SideBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`fixed top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-left flex-shrink-0 px-0 py-20 space-y-2 bg-white border-r border-gray-200 dark:bg-white transition-width duration-800 ${isCollapsed ? 'w-12' : 'w-20'}`}>
      <button
        className={`mx-auto group flex bg-gray-200 text-gray-600 hover:bg-gray-300 rounded-full transform transition-transform duration-400 ${isCollapsed ? 'rotate-90 p-1' : 'rotate-0 p-3'}`}
        style={{ height: isCollapsed ? '2rem' : '3rem', width: isCollapsed ? '2rem' : '3rem' }}
        onClick={handleCollapse}
      >
        <div className='flex items-center justify-center w-full h-full containter'>
          <CollapseIcon icon={<FaChevronDown size='32' />} />
        </div>
      </button>
      <div className={`py-12 fixed flex-col transition-opacity duration-500 ${isCollapsed ? 'opacity-0 space-y-0' : 'opacity-100 space-y-4'}`}>
        <SideBarIcon icon={<BsPlus size='32' />} text='New' />
        <SideBarIcon icon={<BsLinkedin size='24' />} text='LinkedIn' />
        <SideBarIcon icon={<BsInstagram size='32' />} text='Instagram' />
        <SideBarIcon icon={<FaTwitter size='24' />} text='Twitter' />
        <SideBarIcon icon={<FaLightbulb size='32' />} text='Help' />
      </div>
    </div>
  );
}
