import { makeStyles, createStyles, Theme } from "@material-ui/core";
import { red, teal, grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) => {
  const backgroundColor = grey[300];

  return createStyles({
    header: {
      backgroundColor,
    },
    footer: {
      backgroundColor,
    },
    avatar: {
      width: theme.spacing(6),
      height: theme.spacing(6),
    },
  });
});

export default useStyles;
