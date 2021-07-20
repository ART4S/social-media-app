import React from "react";
import { ChevronLeftRounded, ChevronRightRounded } from "@material-ui/icons";
import useStyles from "./useStyles";

interface NavigationProps {
  gotoPrev(): void;
  gotoNext(): void;
}

export default function Navigation({
  gotoPrev,
  gotoNext,
}: NavigationProps): JSX.Element {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.leftArrowBox} onClick={gotoPrev}>
        <ChevronLeftRounded className={classes.arrowIcon} />
      </div>

      <div className={classes.rightArrowBox} onClick={gotoNext}>
        <ChevronRightRounded className={classes.arrowIcon} />
      </div>
    </div>
  );
}
