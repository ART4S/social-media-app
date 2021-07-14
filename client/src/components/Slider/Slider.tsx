import React from "react";
import useStyles from "./useStyles";
import SwipeableViews from "react-swipeable-views";
import { virtualize, bindKeyboard } from "react-swipeable-views-utils";
import Navigation from "./Navigation/Navigation";

const VirtualizeSwipeableViews = bindKeyboard(virtualize(SwipeableViews));

interface SliderProps {
  slideCount: number;
  selectedIndex: number;
  renderSlide: (index: number, key: number) => JSX.Element;
  onSlideChange: (index: number) => void;
}

export default function Slider({
  slideCount,
  selectedIndex,
  renderSlide,
  onSlideChange,
}: SliderProps) {
  const classes = useStyles();

  function gotoPrev() {
    onSlideChange(mod(selectedIndex - 1));
  }

  function gotoNext() {
    onSlideChange(mod(selectedIndex + 1));
  }

  function handleIndexChange(index: number) {
    onSlideChange(mod(index));
  }

  function slideRenderer({ index, key }: { index: number; key: number }) {
    return renderSlide(mod(index), key);
  }

  function mod(index: number) {
    return (slideCount + (index % slideCount)) % slideCount;
  }

  return (
    <div className={classes.root}>
      {slideCount > 1 && <Navigation gotoPrev={gotoPrev} gotoNext={gotoNext} />}

      <VirtualizeSwipeableViews
        className={classes.sliderView}
        slideClassName={classes.slide}
        index={selectedIndex}
        onChangeIndex={handleIndexChange}
        slideRenderer={slideRenderer}
      />
    </div>
  );
}
