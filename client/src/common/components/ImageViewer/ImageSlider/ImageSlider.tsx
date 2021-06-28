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
import IImage from "model/Image";
import SwipeableViews from "react-swipeable-views";
import { ChevronLeftRounded, ChevronRightRounded } from "@material-ui/icons";
import { virtualize, bindKeyboard } from "react-swipeable-views-utils";

const VirtualizeSwipeableViews = bindKeyboard(virtualize(SwipeableViews));

type ImageSliderProps = {
  images: IImage[];
  selectedImageIndex: number;
  onChangeIndex: (newIndex: number) => void;
};

export default function ImageSlider({
  images,
  selectedImageIndex,
  onChangeIndex,
}: ImageSliderProps) {
  const classes = useStyles();

  function gotoPrev() {
    onChangeIndex(prepareIndex(selectedImageIndex - 1));
  }

  function gotoNext() {
    onChangeIndex(prepareIndex(selectedImageIndex + 1));
  }

  function handleChangeIndex(index: number) {
    onChangeIndex(prepareIndex(index));
  }

  function slideRenderer({ index, key }: { index: number; key: number }) {
    const a = index;
    if (index < 0) return null;
    index = prepareIndex(index);
    return (
      <Box key={key} display="flex" justifyContent="center">
        Index:{index};ActualIndex: {a};Key: {key}
      </Box>
    );
    // return <img key={key} className={classes.image} src={images[index].url} />;
  }

  function prepareIndex(index: number) {
    return (images.length + index) % images.length;
  }

  return (
    <div className={classes.root}>
      <div className={classes.imageNavigation}>
        <div className={classes.leftArrowBox} onClick={gotoPrev}>
          <ChevronLeftRounded className={classes.arrowIcon} />
        </div>

        <div className={classes.rightArrowBox} onClick={gotoNext}>
          <ChevronRightRounded className={classes.arrowIcon} />
        </div>
      </div>

      <VirtualizeSwipeableViews
        className={classes.imageBox}
        index={selectedImageIndex}
        onChangeIndex={handleChangeIndex}
        slideRenderer={slideRenderer}
      />
    </div>
  );
}
