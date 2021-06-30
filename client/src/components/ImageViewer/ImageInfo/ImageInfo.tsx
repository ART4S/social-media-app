import { Box, Link, Typography } from "@material-ui/core";
import useStyles from "./useStyles";
import Avatar from "../../Avatar/Avatar";
import moment from "moment";
import { getUserName } from "utils/userUtils";
import Image from "model/ImageDto";

type ImageInfoProps = {
  data: Image;
};

export default function ImageInfo({ data }: ImageInfoProps) {
  const classes = useStyles();

  const author = {
    id: data.authorId,
    firstName: data.authorFirstName,
    lastName: data.authorLastName,
    avatarUrl: data.authorAvatarUrl,
  };

  return (
    <Box display="flex">
      <Avatar className={classes.avatar} src={author.avatarUrl} />

      <Box display="flex" flexDirection="column" ml={2}>
        <Link>
          <Typography>{getUserName(author)}</Typography>
        </Link>

        <Typography variant="subtitle2">
          {moment(data.createDate).fromNow()}
        </Typography>
      </Box>
    </Box>
  );
}
