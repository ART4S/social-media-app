import { Box, Link, Typography } from "@material-ui/core";
import useStyles from "./useStyles";
import Avatar from "../../../../components/Avatar/Avatar";
import moment from "moment";
import { getUserName } from "utils/userUtils";
import type PostImageDto from "model/dto/PostImageDto";
import { getImageInfo, getPostInfo } from "pages/Home/PostList/postListSlice";
import useAppSelector from "hooks/useAppSelector";
import PostDto from "model/dto/PostDto";

interface ImageInfoProps {
  postId: string;
  imageId: string;
}

export default function ImageInfo({ postId, imageId }: ImageInfoProps) {
  const classes = useStyles();
  const post: PostDto = useAppSelector((state) => getPostInfo(state, postId));
  const image: PostImageDto = useAppSelector((state) =>
    getImageInfo(state, postId, imageId),
  );

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
