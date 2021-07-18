import React from "react";
import { Typography, Link } from "@material-ui/core";
import { Box } from "@material-ui/core";
import moment from "moment";

import { getUserName } from "utils/userUtils";
import useStyles from "./useStyles";
import DeleteButton from "components/Buttons/DeleteButton/DeleteButton";
import Avatar from "components/Avatar/Avatar";
import type PostDto from "model/dto/PostDto";
import useAppSelector from "hooks/useAppSelector";
import { actions, getIsCurrentUserPost, getPostInfo } from "../postListSlice";
import Navigate from "components/Navigate/Navigate";
import useAppDispatch from "hooks/useAppDispatch";

interface PostInfoProps {
  postId: string;
}

export default function PostInfo({ postId }: PostInfoProps): JSX.Element {
  const classes = useStyles();

  const dispatch = useAppDispatch();

  const post: PostDto = useAppSelector((state) => getPostInfo(state, postId));

  const isCurrentUserPost: boolean = useAppSelector((state) =>
    getIsCurrentUserPost(state, postId),
  );

  function handleDelete() {
    dispatch(actions.deletePost(postId));
  }

  const userName = getUserName({
    firstName: post.authorFirstName,
    lastName: post.authorLastName,
  });

  return (
    <Box display="flex" justifyContent="space-between">
      <Box display="flex">
        <Avatar className={classes.avatar} src={post.authorAvatarUrl} />

        <Box display="flex" flexDirection="column" ml={2}>
          <Navigate to={post.authorId}>
            <Link>
              <Typography>{userName}</Typography>
            </Link>
          </Navigate>

          <Typography variant="subtitle2">
            {moment(post.createDate).fromNow()}
          </Typography>
        </Box>
      </Box>

      {isCurrentUserPost && <DeleteButton onClick={handleDelete} />}
    </Box>
  );
}
