import { makeStyles, createStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
  }),
);

export default useStyles;
