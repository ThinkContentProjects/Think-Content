import { postState } from "@/src/atoms/postsAtom";
import { useRecoilState } from "recoil";

const usePosts = () => {
  const [postStateValue, setPostStateValue] = useRecoilState(postState);

  const onSelectPost = () => {};
  const onDeletePost = async () => {};

  return {
    postStateValue,
    setPostStateValue,
    onSelectPost,
    onDeletePost,
  };
};
export default usePosts;
