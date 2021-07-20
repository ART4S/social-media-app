import { makeStyles, createStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    image: {
      maxWidth: "100%",
      maxHeight: "100%",
      objectFit: "cover",
    },
  }),
);

export default useStyles;
