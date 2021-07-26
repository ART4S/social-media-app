import React from "react";
import { Box, Link, Typography } from "@material-ui/core";
import moment from "moment";

import { getUserName } from "utils/userUtils";
import type PostImageDto from "model/dto/postImage/PostImageDto";
import { getImageInfo, getPostInfo } from "components/PostList/postListSlice";
import useAppSelector from "hooks/useAppSelector";
import type PostDto from "model/dto/post/PostDto";
import NavLink from "components/NavLink/NavLink";

import Avatar from "../../Avatar/Avatar";

import useStyles from "./useStyles";

type ImageInfoProps = {
  postId: string;
  imageId: string;
};

export default function ImageInfo({ postId, imageId }: ImageInfoProps): JSX.Element {
  const classes = useStyles();
  const post: PostDto = useAppSelector((state) => getPostInfo(state, postId));
  const image: PostImageDto = useAppSelector((state) => getImageInfo(state, postId, imageId));
  const authorName = getUserName({
    firstName: post.authorFirstName,
    lastName: post.authorLastName,
  });

  return (
    <Box display="flex">
      <Avatar className={classes.avatar} src={post.authorAvatarUrl} />

      <Box display="flex" flexDirection="column" ml={2}>
        <NavLink to={post.authorId}>
          <Link>
            <Typography>{authorName}</Typography>
          </Link>
        </NavLink>

        <Typography variant="subtitle2">{moment(image.createDate).fromNow()}</Typography>
      </Box>
    </Box>
  );
}
