import { makeStyles, createStyles, Theme } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      display: "flex",
      padding: theme.spacing(1, 3),
      backgroundColor: grey[300],
    },
    body: {
      backgroundColor: theme.palette.background.paper,
    },
    footer: {
      display: "flex",
      justifyContent: "flex-end",
      padding: theme.spacing(2),
      backgroundColor: grey[300],
    },
    actions: {
      display: "flex",
      justifyContent: "flex-start",
      padding: theme.spacing(2),
    },
  })
);

export default useStyles;
