import { Typography, Box, Link } from "@material-ui/core";

import moment from "moment";
import Avatar from "components/Avatar/Avatar";

import { getUserName } from "utils/userUtils";
import useAppSelector from "hooks/useAppSelector";
import { ImageCommentDto } from "model/dto/ImageCommentDto";
import {
  actions,
  getImageCommentById,
  getIsCurrentUserImageComment,
} from "../postListSlice";
import useAppDispatch from "hooks/useAppDispatch";

import DeleteButton from "components/Buttons/DeleteButton/DeleteButton";
import Navigate from "components/Navigate/Navigate";

interface ImageCommentProps {
  postId: string;
  imageId: string;
  commentId: string;
}

export default function ImageComment({
  postId,
  imageId,
  commentId,
}: ImageCommentProps): JSX.Element {
  const dispatch = useAppDispatch();

  const comment: ImageCommentDto = useAppSelector((state) =>
    getImageCommentById(state, postId, imageId, commentId),
  );
  const userName: string = getUserName({
    firstName: comment.authorFirstName,
    lastName: comment.authorLastName,
  });
  const isCurrentUserComment: boolean = useAppSelector((state) =>
    getIsCurrentUserImageComment(state, postId, imageId, commentId),
  );

  function handleDelete() {
    dispatch(actions.deleteImageComment({ postId, imageId, commentId }));
  }

  return (
    <Box display="flex">
      <Avatar src={comment.avatarUrl} />

      <Box display="flex" flexDirection="column" ml={2}>
        <Navigate to={comment.authorId}>
          <Link>{userName}</Link>
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
