import { Timestamp } from "@google-cloud/firestore";
import { atom } from "recoil";

export interface Workspace {
  id: string;
  creatorId: string;
  numberOfMembers: number;
  members: string[];
  createdAt?: Timestamp;
  imageURL?: string;
}

export interface WorkspaceSnippet {
  workspaceId: string;
  isOwner?: boolean;
  imageURL?: string;
}

interface WorkspaceState {
  mySnippets: WorkspaceSnippet[];
  currentWorkspace?: Workspace;
  snippetsFetched: boolean;
}

const defaultWorkspaceState: WorkspaceState = {
  mySnippets: [],
  snippetsFetched: false,
};

export const workspaceState = atom<WorkspaceState>({
  key: "workspacesState",
  default: defaultWorkspaceState,
});
