import { makeStyles, createStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      display: "flex",
      padding: theme.spacing(1, 3),
      backgroundColor: theme.palette.action.focus,
    },
    footer: {
      display: "flex",
      justifyContent: "flex-end",
      padding: theme.spacing(2),
      backgroundColor: theme.palette.action.focus,
    },
  })
);

export default useStyles;
