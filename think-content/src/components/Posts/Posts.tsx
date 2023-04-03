import { Post } from "@/src/atoms/postsAtom";
import { Workspace } from "@/src/atoms/workspacesAtom";
import { auth, db } from "@/src/firebase/firebase";
import usePosts from "@/src/hooks/usePosts";
import { Flex, Stack } from "@chakra-ui/react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import PostItem from "./PostItem";
import PostLoader from "./PostLoader";

type PostsProps = {
  workspaceData: Workspace;
};

const Posts: React.FC<PostsProps> = ({ workspaceData }) => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const { postStateValue, setPostStateValue, onDeletePost, onSelectPost } =
    usePosts();

  const getPosts = async () => {
    setLoading(true);
    try {
      // get posts for the community
      const postsQuery = query(
        collection(db, "posts"),
        where("workspaceId", "==", workspaceData.id),
        orderBy("createdAt", "desc")
      );

      const postDocs = await getDocs(postsQuery);

      // store in post state
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as Post[],
      }));

      console.log("posts");
    } catch (error: any) {
      console.log("getPosts error", error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getPosts();
  }, [workspaceData]);

  return (
    <>
    {loading ? (
        <PostLoader />) : (
    <Flex justify="center">
      <Stack width="500px">
        {postStateValue.posts.map((item) => (
          <PostItem
            key={item.id}
            post={item}
            userIsCreator={user?.uid === item.creatorId}
            onDeletePost={onDeletePost}
            onSelectPost={onSelectPost}
          />
        ))}
      </Stack>
    </Flex>
    )}
    </>
  );
};
export default Posts;
