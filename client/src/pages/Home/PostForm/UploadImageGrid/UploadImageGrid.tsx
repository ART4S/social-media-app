import React from "react";
import { Grid, GridSpacing, IconButton, Box } from "@material-ui/core";
import useStyles from "./useStyles";
import DeleteIcon from "@material-ui/icons/Delete";

const SPACING: GridSpacing = 1;

type Image = {
  url: string;
};

type UploadImageGridProps = {
  images: Image[];
  onImageDelete: (index: number) => void;
};

function UploadItem({ data, onDelete }: { data: Image; onDelete: () => void }) {
  const classes = useStyles();

  return (
    <Box position="relative" width="100%" height="100%">
      <img className={classes.image} src={data.url} />

      <Box position="absolute" top={0} right={0}>
        <IconButton color="secondary" onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default function UploadImageGrid({
  images,
  onImageDelete,
}: UploadImageGridProps): JSX.Element {
  let elements: JSX.Element[] = [];

  switch (images.length) {
    case 1:
    case 2:
      elements = images.map((image, index) => (
        <Grid key={image.url} item xs>
          <UploadItem data={image} onDelete={() => onImageDelete(index)} />
        </Grid>
      ));
      break;

    case 3:
    case 4:
      elements = [
        <Grid key={images[0].url} item xs={8}>
          <UploadItem data={images[0]} onDelete={() => onImageDelete(0)} />
        </Grid>,

        <Grid item xs={4} container direction="column" spacing={SPACING}>
          {images.slice(1).map((image, index) => (
            <Grid key={image.url} item xs>
              <UploadItem
                data={image}
                onDelete={() => onImageDelete(index + 1)}
              />
            </Grid>
          ))}
        </Grid>,
      ];
      break;

    case 5:
      elements = [
        ...images.slice(0, 2).map((image, index) => (
          <Grid key={image.url} item xs={6}>
            <UploadItem data={image} onDelete={() => onImageDelete(index)} />
          </Grid>
        )),

        ...images.slice(2).map((image, index) => (
          <Grid key={image.url} item xs>
            <UploadItem
              data={image}
              onDelete={() => onImageDelete(index + 2)}
            />
          </Grid>
        )),
      ];
      break;

    case 6:
    case 7:
    case 8:
      elements = [
        <Grid key={images[0].url} item xs={12}>
          <UploadItem data={images[0]} onDelete={() => onImageDelete(0)} />
        </Grid>,

        ...images.slice(1).map((image, index) => (
          <Grid key={image.url} item xs>
            <UploadItem
              data={image}
              onDelete={() => onImageDelete(index + 1)}
            />
          </Grid>
        )),
      ];
      break;

    case 9:
      elements = images.map((image, index) => (
        <Grid key={image.url} item xs={4}>
          <UploadItem data={image} onDelete={() => onImageDelete(index)} />
        </Grid>
      ));
      break;

    case 10:
      elements = [
        ...images.slice(0, 2).map((image, index) => (
          <Grid key={image.url} item xs={6}>
            <UploadItem data={image} onDelete={() => onImageDelete(index)} />
          </Grid>
        )),

        ...images.slice(2).map((image, index) => (
          <Grid key={image.url} item xs={3}>
            <UploadItem
              data={image}
              onDelete={() => onImageDelete(index + 2)}
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
