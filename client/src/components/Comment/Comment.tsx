import type IComment from "model/CommentDto";
import { IconButton, Typography, Box, Link } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import moment from "moment";
import Avatar from "../Avatar/Avatar";

import { getUserName } from "utils/userUtils";

type CommentProps = {
  data: IComment;
};

export default function Comment({ data }: CommentProps): JSX.Element {
  const user = {
    id: data.authorId,
    firstName: data.authorFirstName,
    lastName: data.authorLastName,
  };

  return (
    <Box display="flex">
      <Avatar src={data.avatarUrl} />

      <Box display="flex" flexDirection="column" ml={2}>
        <Link>{getUserName(user)}</Link>

        <Typography variant="body2">{data.body}</Typography>

        <Box display="flex" alignItems="center">
          <Typography variant="caption">
            {moment(data.createdAt).fromNow()}
          </Typography>

          <IconButton size="small">
            <DeleteIcon color="secondary" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
