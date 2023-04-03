import {
  DirectoryMenuItem,
  directoryMenuState,
} from "@/atoms/directoryMenuAtom";
import { workspaceState } from "@/atoms/workspacesAtom";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { FaSquareFull } from 'react-icons/fa';

// this hook manages recoil state of the directory menu
const useDirectory = () => {
  const [directoryState, setDirectoryState] =
    useRecoilState(directoryMenuState);
  const router = useRouter();
  const workspaceStateValue = useRecoilValue(workspaceState);

  const onSelectMenuItem = (menuItem: DirectoryMenuItem) => {
    setDirectoryState((prev) => ({
      ...prev,
      selectedMenuItem: menuItem,
    }));

    router.push(menuItem.link);
    if (directoryState.isOpen) {
      ToggleMenuOpen();
    }
  };

  const ToggleMenuOpen = () => {
    setDirectoryState((prev) => ({
      ...prev,
      isOpen: !directoryState.isOpen,
    }));
  };

  useEffect(() => {
    const { currentWorkspace } = workspaceStateValue;
    if (currentWorkspace) {
        setDirectoryState(prev => ({
            ...prev,
            selectedMenuItem: { 
                displayText: `${currentWorkspace.id}`,
                link: `/workspace/${currentWorkspace.id}`,
                imageURL: currentWorkspace.imageURL,
                icon: FaSquareFull,
                iconColor: 'blue.500'
            }
        }))
    }

  }, [workspaceStateValue.currentWorkspace]);

  return { directoryState, ToggleMenuOpen, onSelectMenuItem };
};
export default useDirectory;
