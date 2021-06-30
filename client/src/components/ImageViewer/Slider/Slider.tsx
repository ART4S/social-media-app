import React from "react";
import useStyles from "./useStyles";
import IImage from "model/ImageDto";
import SwipeableViews from "react-swipeable-views";
import { ChevronLeftRounded, ChevronRightRounded } from "@material-ui/icons";
import { virtualize, bindKeyboard } from "react-swipeable-views-utils";

const VirtualizeSwipeableViews = bindKeyboard(virtualize(SwipeableViews));

type SliderProps = {
  images: IImage[];
  selectedImageIndex: number;
  onChangeIndex: (newIndex: number) => void;
};

export default function Slider({
  images,
  selectedImageIndex,
  onChangeIndex,
}: SliderProps) {
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
    index = prepareIndex(index);
    return <img key={key} className={classes.image} src={images[index].url} />;
  }

  function prepareIndex(index: number) {
    return (images.length + (index % images.length)) % images.length;
  }

  return (
    <div className={classes.root}>
      {images.length > 1 && (
        <div className={classes.imageNavigation}>
          <div className={classes.leftArrowBox} onClick={gotoPrev}>
            <ChevronLeftRounded className={classes.arrowIcon} />
          </div>

          <div className={classes.rightArrowBox} onClick={gotoNext}>
            <ChevronRightRounded className={classes.arrowIcon} />
          </div>
        </div>
      )}

      <VirtualizeSwipeableViews
        className={classes.imageBox}
        index={selectedImageIndex}
        onChangeIndex={handleChangeIndex}
        slideRenderer={slideRenderer}
      />
    </div>
  );
}
