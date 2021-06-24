import React from "react";
import { Typography, Link } from "@material-ui/core";
import { Paper, IconButton, Avatar, Box, Badge } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { PhotoCameraOutlined, Favorite, Chat } from "@material-ui/icons";
import moment from "moment";

import { getUserName } from "utils/userUtils";
import useStyles from "./useStyles";
import Comment from "../Comment/Comment";
import CommentForm from "../CommentForm/CommentForm";

import type IPost from "model/Post";

import comments from "mock/comments";

type PostProps = { data: IPost };

export default function Post({ data }: PostProps): JSX.Element {
  const classes = useStyles();

  const user = {
    firstName: data.authorFirstName,
    lastName: data.authorLastName,
  };

  return (
    <Paper elevation={3}>
      <div className={classes.header}>
        <Box display="flex">
          <Avatar className={classes.avatar} src={data.authorAvatarUrl}>
            <PhotoCameraOutlined />
          </Avatar>

          <Box display="flex" flexDirection="column" ml={2}>
            <Link>
              <Typography>{getUserName(user)}</Typography>
            </Link>

            <Typography variant="subtitle2">
              {moment(data.createdAt).fromNow()}
            </Typography>
          </Box>
        </Box>

        <IconButton>
          <DeleteIcon color="secondary" />
        </IconButton>
      </div>

      <Typography className={classes.body} variant="body1">
        {data.body}
      </Typography>

      <Box display="flex" padding={2}>
        <Badge classes={{ badge: classes.likeBadge }} badgeContent={4}>
          <Favorite className={classes.likeIcon} />
        </Badge>

        <Box ml={2}>
          <Badge classes={{ badge: classes.commentBadge }} badgeContent={4}>
            <Chat className={classes.commentIcon} />
          </Badge>
        </Box>
      </Box>

      <div className={classes.footer}>
        <CommentForm />

        {comments.map((x) => (
          <Comment data={x} />
        ))}
      </div>
    </Paper>
  );
}
