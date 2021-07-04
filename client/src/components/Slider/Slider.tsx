import React from "react";
import useStyles from "./useStyles";
import PostImageDto from "model/dto/PostImageDto";
import SwipeableViews from "react-swipeable-views";
import { ChevronLeftRounded, ChevronRightRounded } from "@material-ui/icons";
import { virtualize, bindKeyboard } from "react-swipeable-views-utils";

const VirtualizeSwipeableViews = bindKeyboard(virtualize(SwipeableViews));

interface SliderProps {
  images: PostImageDto[];
  selectedImageIndex: number;
  onIndexChange: (newIndex: number) => void;
}

export default function Slider({
  images,
  selectedImageIndex,
  onIndexChange,
}: SliderProps) {
  const classes = useStyles();

  function gotoPrev() {
    onIndexChange(prepareIndex(selectedImageIndex - 1));
  }

  function gotoNext() {
    onIndexChange(prepareIndex(selectedImageIndex + 1));
  }

  function handleIndexChange(index: number) {
    onIndexChange(prepareIndex(index));
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
        className={classes.imageView}
        index={selectedImageIndex}
        onChangeIndex={handleIndexChange}
        slideRenderer={slideRenderer}
      />
    </div>
  );
}
