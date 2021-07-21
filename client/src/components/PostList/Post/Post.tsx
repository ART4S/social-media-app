import React from "react";
import { Typography, Paper, Box } from "@material-ui/core";

import useAppSelector from "hooks/useAppSelector";

import PostInfo from "../PostInfo/PostInfo";
import { getPostInfo } from "../postListSlice";
import { PostActivities } from "../PostActivities/PostActivities";
import { PostCommentList } from "../PostCommentList/PostCommentList";
import PostAttachments from "../PostAttachments/PostAttachments";

import useStyles from "./useStyles";

type PostProps = {
  postId: string;
};

export default function Post({ postId }: PostProps): JSX.Element {
  const classes = useStyles();

  const body: string = useAppSelector((state) => getPostInfo(state, postId).body);

  return (
    <Paper elevation={3}>
      <div className={classes.header}>
        <PostInfo postId={postId} />
      </div>

      <Box p={2}>
        <Typography variant="body1">{body}</Typography>
      </Box>

      <Box px={2}>
        <PostAttachments postId={postId} />
      </Box>

      <Box display="flex" p={2}>
        <PostActivities postId={postId} />
      </Box>

      <div className={classes.footer}>
        <PostCommentList postId={postId} />
      </div>
    </Paper>
  );
}
