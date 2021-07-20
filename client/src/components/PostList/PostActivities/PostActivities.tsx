import React from "react";
import { Box } from "@material-ui/core";

import LikeButton from "components/Buttons/LikeButton/LikeButton";
import ShareButton from "components/Buttons/ShareButton/ShareButton";

import useAppSelector from "hooks/useAppSelector";
import { actions, getPostInfo } from "../postListSlice";
import useAppDispatch from "hooks/useAppDispatch";
import PostDto from "model/dto/post/PostDto";

interface PostActivitiesProps {
  postId: string;
}

export function PostActivities({ postId }: PostActivitiesProps) {
  const dispatch = useAppDispatch();

  const post: PostDto = useAppSelector((state) => getPostInfo(state, postId));

  return (
    <Box display="flex">
      <LikeButton
        active={post.liked}
        likeCount={post.likeCount}
        onClick={() => dispatch(actions.togglePostLike(postId))}
      />

      <ShareButton
        active={post.shared}
        shareCount={post.shareCount}
        onClick={() => dispatch(actions.sharePost(postId))}
      />
    </Box>
  );
}
