import { makeStyles, createStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      display: "flex",
      justifyContent: "space-between",
      padding: theme.spacing(1, 3),
      backgroundColor: theme.palette.action.focus,
    },
    info: {
      display: "flex",
      "& > *": {
        marginRight: theme.spacing(2),
      },
    },
    avatar: {
      width: theme.spacing(6),
      height: theme.spacing(6),
    },
    body: {
      padding: theme.spacing(2),
    },
    footer: {
      padding: theme.spacing(1, 3),
      backgroundColor: theme.palette.action.focus,
      display: "flex",
      flexDirection: "column",
      justifyContent: "start",
      "& > *": {
        marginTop: theme.spacing(2),
      },
    },
    commentForm: {
      width: "100%",
    },
  })
);

export default useStyles;
