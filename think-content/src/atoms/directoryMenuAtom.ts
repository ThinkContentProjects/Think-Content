import { IconType } from "react-icons";
import { atom } from "recoil";
import { RiDashboardFill } from 'react-icons/ri';

// type for directory menu item - maybe shouldn't be in here
export type DirectoryMenuItem = {
  displayText: string;
  link: string;
  icon: IconType;
  imageURL?: string;
  numMembers?: string,
};

// default directory menu item value - also potentially should be moved
export const defaultMenuItem: DirectoryMenuItem = {
  displayText: "Dashboard",
  link: "/dashboard",
  icon: RiDashboardFill,
};

// type for the atom
interface DirectoryMenuState {
  isOpen: boolean;
  selectedMenuItem: any;
}

// default atom value
export const defaultMenuState: DirectoryMenuState = {
  isOpen: false,
  selectedMenuItem: defaultMenuItem,
};

// actual atom that will be passed to components
export const directoryMenuState = atom<DirectoryMenuState>({
  key: "directoryMenuState",
  default: defaultMenuState,
});
