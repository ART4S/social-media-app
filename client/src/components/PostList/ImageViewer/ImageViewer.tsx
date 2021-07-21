import React from "react";
import { Grid, Box, Divider, Modal } from "@material-ui/core";

import type PostImageDto from "model/dto/postImage/PostImageDto";
import ImageSlider from "components/Slider/Slider";
import useAppDispatch from "hooks/useAppDispatch";
import useAppSelector from "hooks/useAppSelector";

import { actions, getImages, getSelectedImageIndex, getImageCommentsCount } from "../postListSlice";
import Activities from "../ImageActivities/ImageActivities";
import ImageInfo from "../ImageInfo/ImageInfo";
import ImageCommentList from "../ImageCommentList/ImageCommentList";
import ImageCommentForm from "../ImageCommentForm/ImageCommentForm";

import useStyles from "./useStyles";

type ImageViewerProps = {
  postId: string;
};

export default function ImageViewer({ postId }: ImageViewerProps): JSX.Element {
  const classes = useStyles();

  const dispatch = useAppDispatch();

  const images: PostImageDto[] = useAppSelector((state) => getImages(state, postId));

  const selectedImageIndex: number = useAppSelector(
    (state) => getSelectedImageIndex(state, postId)!,
  );

  const selectedImage: PostImageDto = images[selectedImageIndex];

  const hasAnyComment: boolean = useAppSelector(
    (state) => getImageCommentsCount(state, postId, selectedImage.id) > 0,
  );

  function handleSlideChange(index: number) {
    dispatch(actions.setSelectedImage({ postId, index }));
  }

  function handleClose() {
    dispatch(actions.setSelectedImage({ postId, index: null }));
  }

  return (
    <Modal className={classes.modal} onClose={handleClose} open disablePortal>
      <Box className={classes.content} display="flex" justifyContent="center" height="80vh">
        <Box width="66%">
          <ImageSlider
            slideCount={images.length}
            selectedIndex={selectedImageIndex}
            renderSlide={(index: number, key: number) => (
              <img key={key} className={classes.image} src={images[index].url} />
            )}
            onSlideChange={handleSlideChange}
          />
        </Box>

        <Box width="34%" display="flex" flexDirection="column">
          <Box
            style={{
              height: "100%",
              overflowY: "auto",
            }}
          >
            <Grid container direction="column">
              <Grid item xs>
                <Box p={1}>
                  <ImageInfo postId={postId} imageId={selectedImage.id} />
                </Box>
              </Grid>

              <Grid item xs>
                <Divider />

                <Box px={1} py={2}>
                  <Activities postId={postId} imageId={selectedImage.id} />
                </Box>

                {!hasAnyComment && <Divider />}
              </Grid>

              <Grid item xs="auto">
                <ImageCommentList postId={postId} imageId={selectedImage.id} />
              </Grid>
            </Grid>
          </Box>

          <Box width="100%">
            <Divider />

            <Box p={1}>
              <ImageCommentForm postId={postId} imageId={selectedImage.id} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
