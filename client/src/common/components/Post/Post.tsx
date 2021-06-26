import React from "react";
import { Typography, Link } from "@material-ui/core";
import { Paper, IconButton, Box, Badge } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { Favorite, FavoriteBorder, Chat } from "@material-ui/icons";
import moment from "moment";

import { getUserName } from "utils/userUtils";
import useStyles from "./useStyles";
import Comment from "../Comment/Comment";
import CommentForm from "../Forms/CommentForm/CommentForm";
import Avatar from "../Avatar/Avatar";

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
        <Box display="flex" justifyContent="space-between" px={3} py={1}>
          <Box display="flex">
            <Avatar className={classes.avatar} src={data.authorAvatarUrl} />

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
        </Box>
      </div>

      <Typography className={classes.body} variant="body1">
        {data.body}
      </Typography>

      <Box display="flex" padding={2}>
        <Badge classes={{ badge: classes.likeBadge }} badgeContent={4}>
          {data.liked ? (
            <Favorite className={classes.likeIcon} />
          ) : (
            <FavoriteBorder className={classes.likeIcon} />
          )}
        </Badge>

        <Box ml={2}>
          <Badge classes={{ badge: classes.commentBadge }} badgeContent={4}>
            <Chat className={classes.commentIcon} />
          </Badge>
        </Box>
      </Box>

      <div className={classes.footer}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="start"
          py={1}
          px={3}
        >
          <Box mt={2}>
            <CommentForm />
          </Box>

          {comments.map((x) => (
            <Box mt={2}>
              <Comment data={x} />
            </Box>
          ))}
        </Box>
      </div>
    </Paper>
  );
}
