import React from "react";
import { Typography, Link } from "@material-ui/core";
import { Box } from "@material-ui/core";
import moment from "moment";

import { getUserName } from "utils/userUtils";
import useStyles from "./useStyles";
import Avatar from "components/Avatar/Avatar";
import type PostDto from "model/dto/PostDto";
import useAppSelector from "hooks/useAppSelector";
import { getPostInfo } from "../postListSlice";

interface PostInfoProps {
  postId: string;
}

export default function PostInfo({ postId }: PostInfoProps): JSX.Element {
  const classes = useStyles();

  const post: PostDto = useAppSelector((state) => getPostInfo(state, postId));

  return (
    <Box display="flex">
      <Avatar className={classes.avatar} src={post.authorAvatarUrl} />

      <Box display="flex" flexDirection="column" ml={2}>
        <Link>
          <Typography>
            {getUserName({
              firstName: post.authorFirstName,
              lastName: post.authorLastName,
            })}
          </Typography>
        </Link>

        <Typography variant="subtitle2">
          {moment(post.createDate).fromNow()}
        </Typography>
      </Box>
    </Box>
  );
}
