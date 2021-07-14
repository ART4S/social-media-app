import React from "react";
import { Typography } from "@material-ui/core";
import { Paper, Box } from "@material-ui/core";

import PostInfo from "../PostInfo/PostInfo";
import useStyles from "./useStyles";

import useAppSelector from "hooks/useAppSelector";
import { getPostInfo, actions } from "../postListSlice";
import { PostActivities } from "../PostActivities/PostActivities";
import { PostCommentList } from "../PostCommentList/PostCommentList";
import PostAttachments from "../PostAttachments/PostAttachments";
import useAppDispatch from "hooks/useAppDispatch";
import { getUser } from "pages/Login/loginSlice";
import DeleteButton from "components/Buttons/DeleteButton/DeleteButton";

interface PostProps {
  postId: string;
}

export default function Post({ postId }: PostProps): JSX.Element {
  const classes = useStyles();

  const dispatch = useAppDispatch();

  const body: string = useAppSelector(
    (state) => getPostInfo(state, postId).body,
  );

  const isUserPost: boolean = useAppSelector(
    (state) => getPostInfo(state, postId).authorId == getUser(state).id,
  );

  function handleDelete() {
    dispatch(actions.deletePost(postId));
  }

  return (
    <Paper elevation={3}>
      <div className={classes.header}>
        <Box display="flex" justifyContent="space-between" px={3} py={1}>
          <PostInfo postId={postId} />

          {isUserPost && <DeleteButton onClick={handleDelete} />}
        </Box>
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
        <Box py={2} px={3}>
          <PostCommentList postId={postId} />
        </Box>
      </div>
    </Paper>
  );
}
