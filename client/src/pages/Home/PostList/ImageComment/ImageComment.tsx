import { Typography, Box, Link } from "@material-ui/core";

import moment from "moment";
import Avatar from "components/Avatar/Avatar";

import { getUserName } from "utils/userUtils";
import useAppSelector from "hooks/useAppSelector";
import { ImageCommentDto } from "model/dto/ImageCommentDto";
import { actions, getImageCommentById } from "../postListSlice";
import useAppDispatch from "hooks/useAppDispatch";
import { getUser } from "pages/Login/loginSlice";

import DeleteButton from "components/Buttons/DeleteButton/DeleteButton";

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

  const isUserComment: boolean = useAppSelector(
    (state) =>
      getImageCommentById(state, postId, imageId, commentId).authorId ===
      getUser(state).id,
  );

  function handleDelete() {
    dispatch(actions.deleteImageComment({ postId, imageId, commentId }));
  }

  return (
    <Box display="flex">
      <Avatar src={comment.avatarUrl} />

      <Box display="flex" flexDirection="column" ml={2}>
        <Link>{userName}</Link>

        <Typography variant="body2">{comment.text}</Typography>

        <Box display="flex" alignItems="center">
          <Typography variant="caption">
            {moment(comment.createDate).fromNow()}
          </Typography>

          {isUserComment && (
            <DeleteButton size="small" onClick={handleDelete} />
          )}
        </Box>
      </Box>
    </Box>
  );
}
