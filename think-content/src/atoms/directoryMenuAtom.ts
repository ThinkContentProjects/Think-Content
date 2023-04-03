import { IconType } from "react-icons";
import { atom } from "recoil";
import { CiGrid41 } from 'react-icons/ci';

export type DirectoryMenuItem = {
  displayText: string;
  link: string;
  icon: IconType;
  iconColor: string;
  imageURL?: string;
};

interface DirectoryMenuState {
  isOpen: boolean;
  selectedMenuItem: any;
}

export const defaultMenuItem: DirectoryMenuItem = {
  displayText: "Dashboard",
  link: "/",
  icon: CiGrid41,
  iconColor: "black",
};

export const defaultMenuState: DirectoryMenuState = {
  isOpen: false,
  selectedMenuItem: defaultMenuItem,
};

export const directoryMenuState = atom<DirectoryMenuState>({
  key: "directoryMenuState",
  default: defaultMenuState,
});
