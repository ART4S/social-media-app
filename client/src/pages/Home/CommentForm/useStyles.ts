import { makeStyles, createStyles, Theme } from "@material-ui/core";
import { blue, green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      width: "100%",
    },
    collapse: {
      display: "flex",
      justifyContent: "flex-end",
    },
  })
);

export default useStyles;
