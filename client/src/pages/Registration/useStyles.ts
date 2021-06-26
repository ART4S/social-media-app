import { makeStyles, createStyles, Theme } from "@material-ui/core";

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
    link: {
      "&:hover": {
        cursor: "pointer",
      },
    },
  }),
);

export default useStyles;
