import { IconButton, Typography, Box, Link } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import moment from "moment";
import Avatar from "../../../../components/Avatar/Avatar";

import { getUserName } from "utils/userUtils";
import useAppSelector from "hooks/useAppSelector";
import { ImageCommentDto } from "model/dto/ImageCommentDto";
import {
  getSelectedImageCommentById,
  deleteImageComment,
} from "../postListSlice";
import useAppDispatch from "hooks/useAppDispatch";

interface ImageCommentProps {
  postId: string;
  commentId: string;
}

export default function ImageComment({
  postId,
  commentId,
}: ImageCommentProps): JSX.Element {
  const dispatch = useAppDispatch();
  const comment: ImageCommentDto = useAppSelector((state) =>
    getSelectedImageCommentById(state, postId, commentId),
  );

  return (
    <Box display="flex">
      <Avatar src={comment.avatarUrl} />

      <Box display="flex" flexDirection="column" ml={2}>
        <Link>
          {getUserName({
            firstName: comment.authorFirstName,
            lastName: comment.authorLastName,
          })}
        </Link>

        <Typography variant="body2">{comment.text}</Typography>

        <Box display="flex" alignItems="center">
          <Typography variant="caption">
            {moment(comment.createDate).fromNow()}
          </Typography>

          <IconButton size="small">
            <DeleteIcon
              color="secondary"
              onClick={() =>
                dispatch(deleteImageComment({ postId, commentId }))
              }
            />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
