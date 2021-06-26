import { makeStyles, createStyles, Theme } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      backgroundColor: grey[300],
    },
    body: {
      backgroundColor: theme.palette.background.paper,
    },
    footer: {
      backgroundColor: grey[300],
    },
  }),
);

export default useStyles;
