import { makeStyles, createStyles, Theme } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    badge: {
      color: theme.palette.background.paper,
      backgroundColor: red[500],
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
    icon: {
      color: red[500],
    },
  }),
);

export default useStyles;
