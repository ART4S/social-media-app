/* eslint-disable no-unused-vars */
import React from "react";
import { Grid, GridSpacing } from "@material-ui/core";

const SPACING: GridSpacing = 1;

type ImageGridProps = {
  imagesCount: number;
  renderImage: (index: number) => JSX.Element;
};

export default function ImageGrid({ imagesCount, renderImage }: ImageGridProps): JSX.Element {
  let elements: JSX.Element[] = [];

  const indexes = Array.from(Array(imagesCount)).map((_, index) => index);

  switch (imagesCount) {
    case 1:
    case 2:
      elements = indexes.map((index) => (
        <Grid key={index} item xs>
          {renderImage(index)}
        </Grid>
      ));
      break;

    case 3:
    case 4:
      elements = [
        <Grid key={0} item xs={8}>
          {renderImage(0)}
        </Grid>,

        <Grid key={1} container item direction="column" xs={4} spacing={SPACING}>
          {indexes.slice(1).map((index) => (
            <Grid key={index} item xs>
              {renderImage(index)}
            </Grid>
          ))}
        </Grid>,
      ];
      break;

    case 5:
      elements = [
        ...indexes.slice(0, 2).map((index) => (
          <Grid key={index} item xs={6}>
            {renderImage(index)}
          </Grid>
        )),

        ...indexes.slice(2).map((index) => (
          <Grid key={index} item xs>
            {renderImage(index)}
          </Grid>
        )),
      ];
      break;

    case 6:
    case 7:
    case 8:
      elements = [
        <Grid key={0} item xs={12}>
          {renderImage(0)}
        </Grid>,

        ...indexes.slice(1).map((index) => (
          <Grid key={index} item xs>
            {renderImage(index)}
          </Grid>
        )),
      ];
      break;

    case 9:
      elements = indexes.map((index) => (
        <Grid key={index} item xs={4}>
          {renderImage(index)}
        </Grid>
      ));
      break;

    case 10:
      elements = [
        ...indexes.slice(0, 2).map((index) => (
          <Grid key={index} item xs={6}>
            {renderImage(index)}
          </Grid>
        )),

        ...indexes.slice(2).map((index) => (
          <Grid key={index} item xs={3}>
            {renderImage(index)}
          </Grid>
        )),
      ];
      break;

    default:
      break;
  }

  return (
    <>
      {!!elements.length && (
        <Grid container spacing={SPACING}>
          {elements}
        </Grid>
      )}
    </>
  );
}
