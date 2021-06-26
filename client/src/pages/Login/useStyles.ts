import { makeStyles, createStyles, Theme } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
    },
    header: {
      textTransform: "capitalize",
    },
    avatar: {
      backgroundColor: theme.palette.secondary.main,
    },
    icon: {
      color: theme.palette.common.white,
    },
  }),
);

export default useStyles;
