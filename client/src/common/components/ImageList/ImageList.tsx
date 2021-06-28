import React from "react";
import { Grid, GridSpacing } from "@material-ui/core";
import useStyles from "./useStyles";

const SPACING: GridSpacing = 1;

type ImageListProps = {
  images: string[];
};

export default function ImageList({ images }: ImageListProps): JSX.Element {
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
      elements = images.map((src, index) => (
        <Grid item xs>
          <img
            className={classes.image}
            src={src}
            onClick={() => handleImageClick(index)}
          />
        </Grid>
      ));
      break;

    case 3:
    case 4:
      elements = [
        <Grid item xs={8}>
          <img
            className={classes.image}
            src={images[0]}
            onClick={() => handleImageClick(0)}
          />
        </Grid>,

        <Grid item xs={4} container direction="column" spacing={SPACING}>
          {images.slice(1).map((src, index) => (
            <Grid item xs>
              <img
                className={classes.image}
                src={src}
                onClick={() => handleImageClick(index)}
              />
            </Grid>
          ))}
        </Grid>,
      ];
      break;

    case 5:
      elements = [
        ...images.slice(0, 2).map((src, index) => (
          <Grid item xs={6}>
            <img
              className={classes.image}
              src={src}
              onClick={() => handleImageClick(index)}
            />
          </Grid>
        )),

        ...images.slice(2).map((src, index) => (
          <Grid item xs>
            <img
              className={classes.image}
              src={src}
              onClick={() => handleImageClick(index)}
            />
          </Grid>
        )),
      ];
      break;

    case 6:
    case 7:
    case 8:
      elements = [
        <Grid item xs={12}>
          <img
            className={classes.image}
            src={images[0]}
            onClick={() => handleImageClick(0)}
          />
        </Grid>,

        ...images.slice(1).map((src, index) => (
          <Grid item xs>
            <img
              className={classes.image}
              src={src}
              onClick={() => handleImageClick(index)}
            />
          </Grid>
        )),
      ];
      break;

    case 9:
      elements = images.map((src, index) => (
        <Grid item xs={4}>
          <img
            className={classes.image}
            src={src}
            onClick={() => handleImageClick(index)}
          />
        </Grid>
      ));
      break;

    case 10:
      elements = [
        ...images.slice(0, 2).map((src, index) => (
          <Grid item xs={6}>
            <img
              className={classes.image}
              src={src}
              onClick={() => handleImageClick(index)}
            />
          </Grid>
        )),

        ...images.slice(2).map((src, index) => (
          <Grid item xs={3}>
            <img
              className={classes.image}
              src={src}
              onClick={() => handleImageClick(index)}
            />
          </Grid>
        )),
      ];
      break;
  }

  return (
    <Grid container spacing={SPACING}>
      {elements}
    </Grid>
  );
}
