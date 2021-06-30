import React from "react";
import {
  Grid,
  Box,
  Paper,
  Typography,
  Divider,
  Button,
  Modal,
  Link,
  GridSpacing,
} from "@material-ui/core";
import useStyles from "./useStyles";
import CommentForm from "../Forms/CommentForm/CommentForm";
import Comment from "../Comment/Comment";
import comments from "mock/comments";
import ImageInfo from "./ImageInfo/ImageInfo";
import Activities from "./Activities/Activities";
import IImage from "model/ImageDto";
// import Backdrop from "../Backdrop/Backdrop";
import { ChevronLeftRounded, ChevronRightRounded } from "@material-ui/icons";
import ImageSlider from "./Slider/Slider";

type ImageViewerProps = {
  open: boolean;
  initialImageIndex: number;
  images: IImage[];
  onClose: () => void;
};

export default function ImageViewer({
  open,
  initialImageIndex,
  images,
  onClose,
}: ImageViewerProps): JSX.Element {
  const classes = useStyles();

  const [selectedImageIndex, setSelectedImageIndex] =
    React.useState<number>(initialImageIndex);

  const [selectedImage, setSelectedImage] = React.useState({} as IImage);

  React.useEffect(() => {
    setSelectedImageIndex(initialImageIndex);
  }, [initialImageIndex]);

  React.useEffect(() => {
    setSelectedImage(images[selectedImageIndex]);
  }, [selectedImageIndex]);

  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={onClose}
      disablePortal
    >
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

                <Grid item xs>
                  <Divider />

                  <Box display="flex" justifyContent="center" my={1}>
                    <Link>Show previous comments</Link>
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
    </Modal>
  );
}
