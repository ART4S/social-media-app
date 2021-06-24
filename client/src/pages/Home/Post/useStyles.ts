import { makeStyles, createStyles, Theme } from "@material-ui/core";
import { red, teal, grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) => {
  const badge = {
    color: theme.palette.background.paper,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  };

  const backgroundColor = grey[300];

  return createStyles({
    header: {
      display: "flex",
      justifyContent: "space-between",
      padding: theme.spacing(1, 3),
      backgroundColor,
    },
    body: {
      padding: theme.spacing(2),
    },
    footer: {
      padding: theme.spacing(1, 3),
      backgroundColor,
      display: "flex",
      flexDirection: "column",
      justifyContent: "start",
      "& > *": {
        marginTop: theme.spacing(2),
      },
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
    likeBadge: {
      backgroundColor: red[500],
      ...badge,
    },
    likeIcon: {
      color: red[500],
    },
    commentBadge: {
      backgroundColor: teal[500],
      ...badge,
    },
    commentIcon: {
      color: teal[500],
    },
  });
});

export default useStyles;
