import { Post } from "@/atoms/postsAtom";
import { Flex, Icon, Stack, Text } from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import { IoArrowRedoOutline, IoBookmarkOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";

type PostItemProps = {
  post: Post;
  userIsCreator: boolean;
  onDeletePost: () => {};
  onSelectPost: () => void;
};

const PostItem: React.FC<PostItemProps> = ({
  post,
  userIsCreator,
  onDeletePost,
  onSelectPost,
}) => {
  return (
    <Flex
      border="1px solid"
      bg="white"
      borderColor="gray.300"
      borderRadius={4}
      _hover={{ borderColor: "gray.500" }}
      cursor="pointer"
      onClick={onSelectPost}
    >
      <Stack spacing={1} p="10px">
        <Stack direction="row" spacing={0.6} align="center" fontSize="9pt">
          <Text>
            {" "}
            Created by {post.creatorDisplayName}{" "}
            {moment(new Date(post.createdAt?.seconds * 1000)).fromNow()}
          </Text>
        </Stack>
        <Text fontSize="12pt" fontWeight={600}>
          {post.title}
        </Text>
        <Text fontSize="10pt"> {post.body}</Text>

      <Flex ml={1} mb={0.5} color="gray.500" fontWeight={600}>
        <Flex
          align="center"
          p="8px 10px"
          borderRadius={4}
          _hover={{ bg: "gray.200" }}
          cursor="pointer"
        >
          <Icon as={IoArrowRedoOutline} mr={2}/>
          <Text fontSize="9pt">Share</Text>
        </Flex>
        <Flex
          align="center"
          p="8px 10px"
          borderRadius={4}
          _hover={{ bg: "gray.200" }}
          cursor="pointer"
        >
          <Icon as={IoBookmarkOutline} mr={2}/>
          <Text fontSize="9pt">Save</Text>
        </Flex>
      {userIsCreator &&  (<Flex
          align="center"
          p="8px 10px"
          borderRadius={4}
          _hover={{ bg: "gray.200" }}
          cursor="pointer"
          onClick={onDeletePost}
        >
          <Icon as={AiOutlineDelete} mr={2}/>
          <Text fontSize="9pt">Delete</Text>
        </Flex>)}
      </Flex>
      </Stack>
    </Flex>
  );
};
export default PostItem;
