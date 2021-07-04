import { makeStyles, createStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "relative",
      width: "100%",
      height: "100%",
    },
    imageNavigation: {
      position: "absolute",
      width: "100%",
      height: "100%",
      display: "flex",
    },
    leftArrowBox: {
      position: "relative",
      zIndex: 2,
      width: "34%",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      cursor: "pointer",
      opacity: 0.3,
      "&:hover": {
        opacity: 1,
      },
    },
    rightArrowBox: {
      position: "relative",
      zIndex: 2,
      width: "66%",
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      cursor: "pointer",
      opacity: 0.3,
      "&:hover": {
        opacity: 1,
      },
    },
    arrowIcon: {
      width: theme.spacing(6),
      height: theme.spacing(6),
      color: theme.palette.common.white,
    },
    imageView: {
      position: "relative",
      zIndex: 1,
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.9)",
    },
    image: {
      maxWidth: "100%",
      maxHeight: "100%",
      objectFit: "cover",
    },
  }),
);

export default useStyles;
