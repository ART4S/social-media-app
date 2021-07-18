import { makeStyles, createStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      width: theme.spacing(25),
      height: theme.spacing(25),
    },
  }),
);

export default useStyles;
