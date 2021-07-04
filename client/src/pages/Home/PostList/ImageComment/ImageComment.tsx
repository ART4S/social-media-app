import { IconButton, Typography, Box, Link } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import moment from "moment";
import Avatar from "../../../../components/Avatar/Avatar";

import { getUserName } from "utils/userUtils";
import { ImageCommentDto } from "model/dto/ImageCommentDto";

interface ImageCommentProps {
  data: ImageCommentDto;
}

export default function ImageComment({ data }: ImageCommentProps): JSX.Element {
  return (
    <Box display="flex">
      <Avatar src={data.avatarUrl} />

      <Box display="flex" flexDirection="column" ml={2}>
        <Link>
          {getUserName({
            firstName: data.authorFirstName,
            lastName: data.authorLastName,
          })}
        </Link>

        <Typography variant="body2">{data.text}</Typography>

        <Box display="flex" alignItems="center">
          <Typography variant="caption">
            {moment(data.createDate).fromNow()}
          </Typography>

          <IconButton size="small">
            <DeleteIcon color="secondary" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
