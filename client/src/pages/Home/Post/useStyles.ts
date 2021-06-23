import { makeStyles, createStyles, Theme } from "@material-ui/core";
import { red, green } from "@material-ui/core/colors";

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
    likeBadge: {
      color: theme.palette.background.paper,
      backgroundColor: red[500],
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
    likeIcon: {
      color: red[500],
    },
    commentBadge: {
      color: theme.palette.background.paper,
      backgroundColor: green[500],
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
    commentIcon: {
      color: green[500],
    },
    collapse: {
      display: "flex",
      justifyContent: "flex-end",
    },
  })
);

export default useStyles;
