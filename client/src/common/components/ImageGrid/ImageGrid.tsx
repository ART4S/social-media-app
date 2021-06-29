import React from "react";
import { Grid, GridSpacing } from "@material-ui/core";
import useStyles from "./useStyles";
import ImageViewer from "../ImageViewer/ImageViewer";
import IImage from "model/Image";

const SPACING: GridSpacing = 1;

type ImageGridProps = {
  images: IImage[];
};

export default function ImageGrid({ images }: ImageGridProps): JSX.Element {
  const classes = useStyles();

  const [viewerOpen, setViewerOpen] = React.useState(false);
  const [imageIndex, setImageIndex] = React.useState(0);

  function handleImageClick(index: number) {
    setImageIndex(index);
    setViewerOpen(true);
  }

  let elements: JSX.Element[] = [];

  switch (images.length) {
    case 1:
    case 2:
      elements = images.map((image, index) => (
        <Grid key={image.id} item xs>
          <img
            className={classes.image}
            src={image.url}
            onClick={() => handleImageClick(index)}
          />
        </Grid>
      ));
      break;

    case 3:
    case 4:
      elements = [
        <Grid key={images[0].id} item xs={8}>
          <img
            className={classes.image}
            src={images[0].url}
            onClick={() => handleImageClick(0)}
          />
        </Grid>,

        <Grid item xs={4} container direction="column" spacing={SPACING}>
          {images.slice(1).map((image, index) => (
            <Grid key={image.id} item xs>
              <img
                className={classes.image}
                src={image.url}
                onClick={() => handleImageClick(index + 1)}
              />
            </Grid>
          ))}
        </Grid>,
      ];
      break;

    case 5:
      elements = [
        ...images.slice(0, 2).map((image, index) => (
          <Grid key={image.id} item xs={6}>
            <img
              className={classes.image}
              src={image.url}
              onClick={() => handleImageClick(index)}
            />
          </Grid>
        )),

        ...images.slice(2).map((image, index) => (
          <Grid key={image.id} item xs>
            <img
              className={classes.image}
              src={image.url}
              onClick={() => handleImageClick(index + 2)}
            />
          </Grid>
        )),
      ];
      break;

    case 6:
    case 7:
    case 8:
      elements = [
        <Grid key={images[0].id} item xs={12}>
          <img
            className={classes.image}
            src={images[0].url}
            onClick={() => handleImageClick(0)}
          />
        </Grid>,

        ...images.slice(1).map((image, index) => (
          <Grid key={image.id} item xs>
            <img
              className={classes.image}
              src={image.url}
              onClick={() => handleImageClick(index + 1)}
            />
          </Grid>
        )),
      ];
      break;

    case 9:
      elements = images.map((image, index) => (
        <Grid key={image.id} item xs={4}>
          <img
            className={classes.image}
            src={image.url}
            onClick={() => handleImageClick(index)}
          />
        </Grid>
      ));
      break;

    case 10:
      elements = [
        ...images.slice(0, 2).map((image, index) => (
          <Grid key={image.id} item xs={6}>
            <img
              className={classes.image}
              src={image.url}
              onClick={() => handleImageClick(index)}
            />
          </Grid>
        )),

        ...images.slice(2).map((image, index) => (
          <Grid key={image.id} item xs={3}>
            <img
              className={classes.image}
              src={image.url}
              onClick={() => handleImageClick(index + 2)}
            />
          </Grid>
        )),
      ];
      break;
  }

  return (
    <Grid container spacing={SPACING}>
      {elements}

      {images.length > 0 && (
        <ImageViewer
          open={viewerOpen}
          initialImageIndex={imageIndex}
          images={images}
          onClose={() => setViewerOpen(false)}
        />
      )}
    </Grid>
  );
}
