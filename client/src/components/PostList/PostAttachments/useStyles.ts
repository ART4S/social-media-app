import { makeStyles, createStyles } from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    image: {
      maxWidth: "100%",
      maxHeight: "100%",
      objectFit: "cover",
      cursor: "pointer",
    },
  }),
);

export default useStyles;
