import React from "react";
import { createAction, createReducer } from "@reduxjs/toolkit";
import { Grid, Box, Divider, Modal, Link } from "@material-ui/core";

import CommentForm from "pages/Home/PostList/PostCommentForm/PostCommentForm";
import ImageComment from "pages/Home/PostList/ImageComment/ImageComment";
import ImageInfo from "../ImageInfo/ImageInfo";
import Activities from "../ImageActivities/ImageActivities";
import useStyles from "./useStyles";
import PostImageDto from "model/dto/PostImageDto";
import ImageSlider from "components/Slider/Slider";
import {
  fetchSelectedImageComments,
  fetchMoreSelectedImageComments,
  setSelectedImageIndex,
  getPostImages,
  getSelectedImageIndex,
  getSelectedImageCommentIds,
  getSelectedImageInfo,
  getPostInfo,
  getSelectedImageCommentPagination,
} from "../postListSlice";
import useAppDispatch from "hooks/useAppDispatch";
import useAppSelector from "hooks/useAppSelector";
import PostDto from "model/dto/PostDto";

interface ImageViewerProps {
  postId: string;
  onClose: () => void;
}

export default function ImageViewer({
  postId,
  onClose,
}: ImageViewerProps): JSX.Element {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const post: PostDto = useAppSelector((state) => getPostInfo(state, postId));
  const images: PostImageDto[] = useAppSelector((state) =>
    getPostImages(state, postId),
  );
  const image = useAppSelector((state) =>
    getSelectedImageInfo(state, postId),
  ) as PostImageDto;
  const index = useAppSelector((state) =>
    getSelectedImageIndex(state, postId),
  ) as number;
  const commentIds: string[] = useAppSelector((state) =>
    getSelectedImageCommentIds(state, postId),
  );
  const { currentPage, totalPages } = useAppSelector((state) =>
    getSelectedImageCommentPagination(state, postId),
  );

  React.useEffect(() => {
    dispatch(fetchSelectedImageComments(postId));
  }, [postId, image.id]);

  return (
    <Modal className={classes.modal} onClose={onClose} open disablePortal>
      <Box
        className={classes.content}
        display="flex"
        justifyContent="center"
        height="80vh"
      >
        <Box width="66%">
          <ImageSlider
            selectedImageIndex={index}
            images={images}
            onIndexChange={(index: number) => {
              dispatch(setSelectedImageIndex({ postId, index }));
            }}
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
                  <ImageInfo post={post} image={image} />
                </Box>
              </Grid>

              <Grid item xs>
                <Divider />

                <Box px={1} py={2}>
                  <Activities postId={postId} imageId={image.id} />
                </Box>

                {!commentIds.length && <Divider />}
              </Grid>

              {currentPage < totalPages && (
                <Grid item xs>
                  <Divider />

                  <Box display="flex" justifyContent="center" my={1}>
                    <Link
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        dispatch(fetchMoreSelectedImageComments(postId))
                      }
                    >
                      Show previous comments
                    </Link>
                  </Box>
                </Grid>
              )}

              {commentIds.map((id) => (
                <Grid key={id} item xs="auto">
                  <Divider />

                  <Box p={1}>
                    <ImageComment postId={postId} commentId={id} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box width="100%">
            <Divider />

            <Box p={1}>
              <CommentForm postId={postId} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
