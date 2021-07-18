import type PostCommentDto from "model/dto/PostCommentDto";
import { IconButton, Typography, Box, Link } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import moment from "moment";

import Avatar from "components/Avatar/Avatar";

import { getUserName } from "utils/userUtils";
import useAppDispatch from "hooks/useAppDispatch";
import {
  actions,
  getIsCurrentUserComment,
  getPostCommentById,
} from "../postListSlice";
import useAppSelector from "hooks/useAppSelector";
import Navigate from "components/Navigate/Navigate";
import DeleteButton from "components/Buttons/DeleteButton/DeleteButton";

interface PostCommentProps {
  postId: string;
  commentId: string;
}

export default function PostComment({
  postId,
  commentId,
}: PostCommentProps): JSX.Element {
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

  function handleDelete() {
    dispatch(actions.deletePostComment({ postId, commentId }));
  }

  return (
    <Box display="flex">
      <Avatar src={comment.avatarUrl} />

      <Box display="flex" flexDirection="column" ml={2}>
        <Navigate to={comment.authorId}>
          <Link>{authorName}</Link>
        </Navigate>

        <Typography variant="body2">{comment.text}</Typography>

        <Box display="flex" alignItems="center">
          <Typography variant="caption">
            {moment(comment.createDate).fromNow()}
          </Typography>

          {isCurrentUserComment && (
            <DeleteButton size="small" onClick={handleDelete} />
          )}
        </Box>
      </Box>
    </Box>
  );
}
