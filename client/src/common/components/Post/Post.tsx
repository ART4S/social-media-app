import React from "react";
import { Typography, Link } from "@material-ui/core";
import { Paper, IconButton, Box } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import moment from "moment";

import { getUserName } from "utils/userUtils";
import useStyles from "./useStyles";
import Comment from "../Comment/Comment";
import CommentForm from "../Forms/CommentForm/CommentForm";
import Avatar from "../Avatar/Avatar";
import ImageGrid from "../ImageGrid/ImageGrid";
import LikeButton from "../Buttons/LikeButton/LikeButton";
import ShareButton from "../Buttons/ShareButton/ShareButton";
import PostInfo from "./PostInfo/PostInfo";
import faker from "faker";
import IImage from "model/Image";

import type IPost from "model/Post";

import comments from "mock/comments";

type PostProps = { data: IPost };

export default function Post({ data }: PostProps): JSX.Element {
  const classes = useStyles();

  const images: IImage[] = Array.from(Array(faker.datatype.number(10))).map(
    (x) => ({
      id: faker.datatype.uuid(),
      url: faker.image.image(),
      authorId: faker.datatype.uuid(),
      authorFirstName: faker.name.firstName(),
      authorLastName: faker.name.lastName(),
      authorAvatarUrl: faker.internet.avatar(),
      createDate: faker.date.recent(),
      liked: faker.datatype.boolean(),
      likeCount: faker.datatype.number(),
      shareCount: faker.datatype.number(),
    }),
  );

  const author = {
    firstName: data.authorFirstName,
    lastName: data.authorLastName,
  };

  return (
    <Paper elevation={3}>
      <div className={classes.header}>
        <Box display="flex" justifyContent="space-between" px={3} py={1}>
          <PostInfo data={data} />

          <IconButton>
            <DeleteIcon color="secondary" />
          </IconButton>
        </Box>
      </div>

      <Typography className={classes.body} variant="body1">
        {data.body}
      </Typography>

      {images.length > 0 && (
        <Box px={2}>
          <ImageGrid images={images} />
        </Box>
      )}

      <Box display="flex" p={2}>
        <LikeButton active={data.liked} />

        <ShareButton />
      </Box>

      <div className={classes.footer}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="start"
          py={2}
          px={3}
        >
          <Box my={2}>
            <CommentForm />
          </Box>

          {comments.map((x) => (
            <Box key={x.id} mt={2}>
              <Comment data={x} />
            </Box>
          ))}

          <Box mt={2}>
            <Link>Show more comments</Link>
          </Box>
        </Box>
      </div>
    </Paper>
  );
}
