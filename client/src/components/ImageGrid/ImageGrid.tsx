import React from "react";
import { Grid, GridSpacing } from "@material-ui/core";
import useStyles from "./useStyles";
import PostImageDto from "model/dto/PostImageDto";

const SPACING: GridSpacing = 1;

interface ImageGridProps {
  images: PostImageDto[];
  onImageClick: (image: PostImageDto) => void;
}

export default function ImageGrid({
  images,
  onImageClick,
}: ImageGridProps): JSX.Element {
  const classes = useStyles();

  let elements: JSX.Element[] = [];

  switch (images.length) {
    case 1:
    case 2:
      elements = images.map((image, index) => (
        <Grid key={image.id} item xs>
          <img
            className={classes.image}
            src={image.url}
            onClick={() => onImageClick(image)}
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
            onClick={() => onImageClick(images[0])}
          />
        </Grid>,

        <Grid item xs={4} container direction="column" spacing={SPACING}>
          {images.slice(1).map((image, index) => (
            <Grid key={image.id} item xs>
              <img
                className={classes.image}
                src={image.url}
                onClick={() => onImageClick(image)}
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
              onClick={() => onImageClick(image)}
            />
          </Grid>
        )),

        ...images.slice(2).map((image, index) => (
          <Grid key={image.id} item xs>
            <img
              className={classes.image}
              src={image.url}
              onClick={() => onImageClick(image)}
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
            onClick={() => onImageClick(images[0])}
          />
        </Grid>,

        ...images.slice(1).map((image, index) => (
          <Grid key={image.id} item xs>
            <img
              className={classes.image}
              src={image.url}
              onClick={() => onImageClick(image)}
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
            onClick={() => onImageClick(image)}
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
              onClick={() => onImageClick(image)}
            />
          </Grid>
        )),

        ...images.slice(2).map((image, index) => (
          <Grid key={image.id} item xs={3}>
            <img
              className={classes.image}
              src={image.url}
              onClick={() => onImageClick(image)}
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
