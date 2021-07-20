import { makeStyles, createStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "relative",
      width: "100%",
      height: "100%",
    },
    sliderView: {
      position: "relative",
      zIndex: 1,
      width: "100%",
      height: "100%",
      display: "flex",
      overflowY: "hidden",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.9)",
    },
    slide: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  }),
);

export default useStyles;
