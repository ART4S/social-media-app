import React from "react";
import {
  Grid,
  Box,
  Link,
  Paper,
  Typography,
  Divider,
  GridSpacing,
} from "@material-ui/core";
import useStyles from "./useStyles";
import CommentForm from "../Forms/CommentForm/CommentForm";
import Comment from "../Comment/Comment";
import comments from "mock/comments";
import ImageInfo from "./ImageInfo/ImageInfo";
import Activities from "./Activities/Activities";
import IImage from "model/Image";
import Backdrop from "../Backdrop/Backdrop";
import { ChevronLeftRounded, ChevronRightRounded } from "@material-ui/icons";
import ImageSlider from "./ImageSlider/ImageSlider";

type ImageViewerProps = {
  open: boolean;
  initialImage: IImage;
  images: IImage[];
  onClose: () => void;
};

export default function ImageViewer({
  open,
  initialImage,
  images,
  onClose,
}: ImageViewerProps): JSX.Element {
  const classes = useStyles();

  const [selectedImageIndex, setSelectedImageIndex] = React.useState<number>(0);

  const selectedImage: IImage = images[selectedImageIndex];

  return (
    <Backdrop onClose={onClose}>
      <div className={classes.content}>
        <Box display="flex" justifyContent="center" height="80vh">
          <Box width="66%">
            <ImageSlider
              selectedImageIndex={selectedImageIndex}
              images={images}
              onChangeIndex={(index: number) => {
                setSelectedImageIndex(index);
              }}
            />
          </Box>

          <Box width="34%" display="flex" flexDirection="column">
            <Box
              style={{
                overflowY: "auto",
              }}
            >
              <Grid container direction="column">
                <Grid item xs>
                  <Box p={1}>
                    <ImageInfo data={selectedImage} />
                  </Box>
                </Grid>

                <Grid item xs>
                  <Divider />

                  <Box px={1} py={2}>
                    <Activities liked={selectedImage.liked} />
                  </Box>
                </Grid>

                {comments.map((x) => (
                  <Grid key={x.id} item xs="auto">
                    <Divider />

                    <Box p={1}>
                      <Comment data={x} />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Box width="100%">
              <Divider />

              <Box p={1}>
                <CommentForm />
              </Box>
            </Box>
          </Box>
        </Box>
      </div>
    </Backdrop>
  );
}
