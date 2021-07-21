import React from "react";
import { Typography, Box, Link } from "@material-ui/core";
import moment from "moment";

import Avatar from "components/Avatar/Avatar";
import type PostCommentDto from "model/dto/postComment/PostCommentDto";
import { getUserName } from "utils/userUtils";
import useAppDispatch from "hooks/useAppDispatch";
import useAppSelector from "hooks/useAppSelector";
import NavLink from "components/NavLink/NavLink";
import DeleteButton from "components/Buttons/DeleteButton/DeleteButton";

import { actions, getIsCurrentUserComment, getPostCommentById } from "../postListSlice";

type PostCommentProps = {
  postId: string;
  commentId: string;
};

export default function PostComment({ postId, commentId }: PostCommentProps): JSX.Element {
  const dispatch = useAppDispatch();

  const comment: PostCommentDto = useAppSelector((state) =>
    getPostCommentById(state, postId, commentId),
  );
  const isCurrentUserComment = useAppSelector((state) =>
    getIsCurrentUserComment(state, postId, commentId),
  );
  const authorName = getUserName({
    firstName: comment.authorFirstName,
    lastName: comment.authorLastName,
  });

  return (
    <Box display="flex">
      <Avatar src={comment.avatarUrl} />

      <Box display="flex" flexDirection="column" ml={2}>
        <NavLink to={comment.authorId}>
          <Link>{authorName}</Link>
        </NavLink>

        <Typography variant="body2">{comment.text}</Typography>

        <Box display="flex" alignItems="center">
          <Typography variant="caption">{moment(comment.createDate).fromNow()}</Typography>

          {isCurrentUserComment && (
            <DeleteButton
              size="small"
              onClick={() => dispatch(actions.deletePostComment({ postId, commentId }))}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}
