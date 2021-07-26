import { makeStyles, createStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
      height: "100vh",
      paddingTop: theme.spacing(4),
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
