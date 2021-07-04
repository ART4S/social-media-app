import { Box, Link, Typography } from "@material-ui/core";
import useStyles from "./useStyles";
import Avatar from "../../../../components/Avatar/Avatar";
import moment from "moment";
import { getUserName } from "utils/userUtils";
import type PostImageDto from "model/dto/PostImageDto";
import { Post, getPostById } from "pages/Home/PostList/postListSlice";
import useAppSelector from "hooks/useAppSelector";
import PostDto from "model/dto/PostDto";

interface ImageInfoProps {
  post: PostDto;
  image: PostImageDto;
}

export default function ImageInfo({ post, image }: ImageInfoProps) {
  const classes = useStyles();

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
          {moment(image.createDate).fromNow()}
        </Typography>
      </Box>
    </Box>
  );
}
