import React from "react";
import { Box } from "@material-ui/core";
import { actions, getImageInfo } from "../postListSlice";
import LikeButton from "components/Buttons/LikeButton/LikeButton";
import ShareButton from "components/Buttons/ShareButton/ShareButton";
import useAppSelector from "hooks/useAppSelector";
import useAppDispatch from "hooks/useAppDispatch";
import PostImageDto from "model/dto/postImage/PostImageDto";

interface ImageActivitiesProps {
  postId: string;
  imageId: string;
}

export default function ImageActivities({
  postId,
  imageId,
}: ImageActivitiesProps) {
  const dispatch = useAppDispatch();

  const image: PostImageDto = useAppSelector((state) =>
    getImageInfo(state, postId, imageId),
  );

  return (
    <Box display="flex">
      <LikeButton
        active={image.liked}
        likeCount={image.likeCount}
        onClick={() => dispatch(actions.toggleImageLike({ postId, imageId }))}
      />

      <ShareButton
        active={image.shared}
        shareCount={image.shareCount}
        onClick={() => dispatch(actions.shareImage({ postId, imageId }))}
      />
    </Box>
  );
}
