import { makeStyles, createStyles, Theme } from "@material-ui/core";
import { red, teal, grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      cursor: "pointer",
    },
  }),
);

export default useStyles;
