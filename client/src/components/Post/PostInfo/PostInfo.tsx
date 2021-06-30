import React from "react";
import { Typography, Link } from "@material-ui/core";
import { Paper, IconButton, Box } from "@material-ui/core";
import moment from "moment";

import { getUserName } from "utils/userUtils";
import useStyles from "./useStyles";
import Avatar from "components/Avatar/Avatar";
import IPost from "model/PostDto";

type PostInfoProps = {
  data: IPost;
};

export default function PostInfo({ data }: PostInfoProps): JSX.Element {
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
