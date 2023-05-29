import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";
import { BrandProfile } from "./brandProfilesAtom";

// type for a Workspace
export interface Workspace {
  id: string;
  name: string,
  creatorId: string;
  numberOfMembers: number;
  members: string[];
  owner: string;
  brandProfile: BrandProfile;
  createdAt?: Timestamp;
  imageURL?: string;
}

// workspace snippet type - this is where the user's workspace snippet collection is stored
export interface WorkspaceSnippet {
  workspaceId: string;
  workspaceName: string;
  isOwner?: boolean;
  imageURL?: string;
  numMembers?: string;
}

// describes member values, which are queried from the user collection using the memberlist of the current workspace
export interface MemberSnippet {
  displayName: string;
  email: string;
  uid: string;
}

// types for the actual atom
interface WorkspaceState 
{
  mySnippets: WorkspaceSnippet[];
  memberSnippets: MemberSnippet[];
  currentWorkspace?: Workspace;
  snippetsFetched: boolean;
}

// default atom values
export const defaultWorkspaceState: WorkspaceState = {
  mySnippets: [],
  memberSnippets: [],
  snippetsFetched: false,
};

// actual workspace state to be used in components
export const workspaceState = atom<WorkspaceState>({
  key: "workspacesState",
  default: defaultWorkspaceState,
});