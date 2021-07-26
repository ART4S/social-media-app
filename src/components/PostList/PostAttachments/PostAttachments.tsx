import React from "react";

import ImageGrid from "components/ImageGrid/ImageGrid";
import ImageViewer from "components/PostList/ImageViewer/ImageViewer";
import type PostImageDto from "model/dto/postImage/PostImageDto";
import useAppSelector from "hooks/useAppSelector";
import useAppDispatch from "hooks/useAppDispatch";

import { actions, getImages, getSelectedImageIndex } from "../postListSlice";

import useStyles from "./useStyles";

type PostAttachmentsProps = {
  postId: string;
};

export default function PostAttachments({ postId }: PostAttachmentsProps): JSX.Element {
  const classes = useStyles();

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(actions.fetchPostImages(postId));
  }, [postId]);

  const images: PostImageDto[] = useAppSelector((state) => getImages(state, postId));

  const isImageSelected: boolean = useAppSelector(
    (state) => getSelectedImageIndex(state, postId) != null,
  );

  return (
    <>
      <ImageGrid
        imagesCount={images.length}
        renderImage={(index: number) => (
          <img
            className={classes.image}
            src={images[index].url}
            onClick={() => dispatch(actions.setSelectedImage({ postId, index }))}
          />
        )}
      />

      {isImageSelected && <ImageViewer postId={postId} />}
    </>
  );
}
