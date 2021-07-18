import React from "react";
import { Grid, Box, Divider, Link } from "@material-ui/core";
import ImageComment from "components/PostList/ImageComment/ImageComment";
import {
  actions,
  getImageCommentIds,
  getImageCommentsPagination,
} from "../postListSlice";
import useAppDispatch from "hooks/useAppDispatch";
import useAppSelector from "hooks/useAppSelector";

interface ImageCommentListProps {
  postId: string;
  imageId: string;
}

export default function ImageCommentList({
  postId,
  imageId,
}: ImageCommentListProps): JSX.Element {
  const dispatch = useAppDispatch();

  const commentIds: string[] = useAppSelector((state) =>
    getImageCommentIds(state, postId, imageId),
  );

  const canFetchMoreComments = useAppSelector((state) => {
    const { currentPage, totalPages } = getImageCommentsPagination(
      state,
      postId,
      imageId,
    );
    return currentPage < totalPages;
  });

  React.useEffect(() => {
    dispatch(actions.fetchImageComments({ postId, imageId }));
  }, [postId, imageId]);

  return (
    <Grid container direction="column">
      {canFetchMoreComments && (
        <Grid item xs>
          <Divider />

          <Box display="flex" justifyContent="center" my={1}>
            <Link
              style={{ cursor: "pointer" }}
              onClick={() =>
                dispatch(actions.fetchMoreImageComments({ postId, imageId }))
              }
            >
              Show previous comments
            </Link>
          </Box>
        </Grid>
      )}

      {commentIds.reverse().map((commentId) => (
        <Grid key={commentId} item xs="auto">
          <Divider />

          <Box p={1}>
            <ImageComment
              postId={postId}
              imageId={imageId}
              commentId={commentId}
            />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}
