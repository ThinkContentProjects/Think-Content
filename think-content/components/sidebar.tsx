import React, { useState } from "react";
import { ReactNode } from "react";
import { BsPlus, BsInstagram, BsLinkedin, BsGear } from "react-icons/bs";
import { FaChevronDown, FaTiktok, FaTwitter } from "react-icons/fa";
import PopupWindow from "./popup-settings";


interface SideBarIconProps {
  icon: ReactNode;
  text?: string;
}

interface GeneralIconProps {
  icon: ReactNode;
}

const SideBarIcon: React.FC<SideBarIconProps> = ({ icon, text = "tooltip!" }) => (
  <div className="relative z-10 flex justify-center w-12 h-12 sidebar-icon group">
    {icon}
    <span className="transform opacity-0 sidebar-tooltip right-8 group-hover:opacity-100">
      {text}
    </span>
  </div>
);

export const GeneralIcon: React.FC<GeneralIconProps> = ({icon}) => (
  <div className="group">
    {icon}
  </div>
);

export default function SideBar() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const [showPopup, setShowPopup] = useState(false);

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className={`fixed top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-left flex-shrink-0 px-0 py-20 space-y-2 bg-white border-r border-gray-200 dark:bg-white transition-width duration-700 ${isCollapsed ? "w-8" : "w-20"}`}>
      <button
        className={`flex justify-center text-center text-gray-300 hover:text-gray-500 transform transition-transform duration-400 ${isCollapsed ? "rotate-90" : "rotate-0"}`}
        onClick={handleCollapse}
      >
        <div className="relative justify-center">
          <GeneralIcon icon={<FaChevronDown size="24" />} />
        </div>
      </button>
      <div className={`py-8 sticky flex-col transition-opacity duration-500 ${isCollapsed ? "opacity-0 space-y-0" : "opacity-100 space-y-4"}`}>
        <SideBarIcon icon={<BsPlus size="32" />} text="Add Account" />
        <SideBarIcon icon={<BsLinkedin size="24" />} text="LinkedIn" />
        <SideBarIcon icon={<FaTiktok size="24" />} text="Tiktok" />
        <SideBarIcon icon={<BsInstagram size="32" />} text="Instagram" />
        <SideBarIcon icon={<FaTwitter size="24" />} text="Twitter" />
        <button
          type="button"
          onClick={handleOpenPopup}
        >
          <SideBarIcon icon={<BsGear size="24"/>} text="Settings" />
        </button>
      </div>
      {showPopup && <PopupWindow handleClose={handleClosePopup} />}
    </div>
  );
}
