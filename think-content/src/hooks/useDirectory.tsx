import {
  DirectoryMenuItem,
  directoryMenuState,
} from "@/src/atoms/directoryMenuAtom";
import { workspaceState } from "@/src/atoms/workspacesAtom";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { FaSquareFull } from "react-icons/fa";

// this hook manages recoil state of the directory menu
const useDirectory = () => {
  // read and write to the directory state value
  const [directoryState, setDirectoryState] = useRecoilState(directoryMenuState);
  const router = useRouter();
  // read from the workspace atom
  const workspaceStateValue = useRecoilValue(workspaceState);

  const onSelectMenuItem = (menuItem: DirectoryMenuItem) => {

    // updates the selectedMenuItem in the directory recoil atom
    setDirectoryState((prev) => ({
      ...prev,
      selectedMenuItem: menuItem,
    }));
    // change route
    router.push(menuItem.link);
    // close the menu if it is open
    if (directoryState.isOpen) {
      ToggleMenuOpen();
    }
  };

  // updates the isOpen field in the directory recoil atom
  const ToggleMenuOpen = () => {
    setDirectoryState((prev) => ({
      ...prev,
      isOpen: !directoryState.isOpen,
    }));
  };

  // useEffect runs when the current workspace is changed, which occurs when landing on a new workspace page
  // updates the selected MenuItem to be consistent with the new current workspace
  useEffect(() => {
    const { currentWorkspace } = workspaceStateValue;
    if (currentWorkspace) {
      setDirectoryState((prev) => ({
        ...prev,
        selectedMenuItem: {
          displayText: `${currentWorkspace.name}`,
          link: `/workspace/${currentWorkspace.id}`,
          imageURL: currentWorkspace.imageURL,
          icon: FaSquareFull,
          iconColor: "blue.500",
        },
      }));
    }
  }, [workspaceStateValue.currentWorkspace]);

  return { directoryState, ToggleMenuOpen, onSelectMenuItem };
};
export default useDirectory;
