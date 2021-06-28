import { makeStyles, createStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      width: theme.breakpoints.values.md,
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

export default useStyles;
