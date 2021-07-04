import { makeStyles, createStyles, Theme } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) => {
  const backgroundColor = grey[300];

  return createStyles({
    header: {
      backgroundColor,
    },
    body: {
      backgroundColor: theme.palette.background.paper,
    },
    footer: {
      backgroundColor,
    },
  });
});

export default useStyles;
