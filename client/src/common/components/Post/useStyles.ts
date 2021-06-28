import { makeStyles, createStyles, Theme } from "@material-ui/core";
import { red, teal, grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) => {
  const backgroundColor = grey[300];

  return createStyles({
    header: {
      backgroundColor,
    },
    body: {
      padding: theme.spacing(2),
    },
    footer: {
      backgroundColor,
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
  });
});

export default useStyles;
