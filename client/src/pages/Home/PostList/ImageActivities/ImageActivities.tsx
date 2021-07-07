import React from "react";
import { Box } from "@material-ui/core";
import {
  togglePostImageLike,
  notifyPostImageLiked,
  getPostImageById,
} from "../postListSlice";
import LikeButton from "components/Buttons/LikeButton/LikeButton";
import ShareButton from "components/Buttons/ShareButton/ShareButton";
import useAppSelector from "hooks/useAppSelector";
import useAppDispatch from "hooks/useAppDispatch";

import { debounce, DebouncedFunc } from "lodash";

interface ImageActivitiesProps {
  postId: string;
  imageId: string;
}

export default function ImageActivities({
  postId,
  imageId,
}: ImageActivitiesProps) {
  const dispatch = useAppDispatch();
  const imageLiked = useAppSelector(
    (state) => getPostImageById(state, postId, imageId).liked,
  );

  // TODO: глянуть можно ли сделать напрямую через thunk
  const debouncedNotifyPostImageLiked: DebouncedFunc<() => void> =
    React.useCallback(
      debounce(() => dispatch(notifyPostImageLiked({ postId, imageId })), 500),
      [postId, imageId],
    );

  function handleLikeClick() {
    dispatch(togglePostImageLike({ postId, imageId }));
    debouncedNotifyPostImageLiked();
  }

  return (
    <Box display="flex">
      <LikeButton active={imageLiked} onClick={handleLikeClick} />
      <ShareButton />
    </Box>
  );
}
