import React from "react";
import { Typography, Paper, Box } from "@material-ui/core";

import useAppSelector from "hooks/useAppSelector";

import PostInfo from "../PostInfo/PostInfo";
import { getPostInfo } from "../postListSlice";
import { PostActivities } from "../PostActivities/PostActivities";
import { PostCommentList } from "../PostCommentList/PostCommentList";
import PostAttachments from "../PostAttachments/PostAttachments";

type PostProps = {
  postId: string;
};

export default function Post({ postId }: PostProps): JSX.Element {
  const body: string = useAppSelector((state) => getPostInfo(state, postId).body);

  return (
    <Paper elevation={3}>
      <Box bgcolor="grey.300" px={3} py={1} width="100%">
        <PostInfo postId={postId} />
      </Box>

      <Box p={2}>
        <Typography variant="body1">{body}</Typography>
      </Box>

      <Box px={2}>
        <PostAttachments postId={postId} />
      </Box>

      <Box display="flex" p={2}>
        <PostActivities postId={postId} />
      </Box>

      <Box bgcolor="grey.300" px={3} py={2}>
        <PostCommentList postId={postId} />
      </Box>
    </Paper>
  );
}
