import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

// type for a post, maybe shouldn't be in here?
export type Post = {
  id: string;
  workspaceId: string;
  creatorId: string;
  creatorDisplayName: string;
  title: string;
  body: string;
  createdAt: Timestamp;
};

// type for the post atom state
interface PostState {
  selectedPost: Post | null;
  posts: Post[];
}

// default atom values
const defaultPostState: PostState = {
  selectedPost: null,
  posts: [],
};

// actual atom to be exported, of type PostState
export const postState = atom<PostState>({
    key: 'postState',
    default: defaultPostState
})
