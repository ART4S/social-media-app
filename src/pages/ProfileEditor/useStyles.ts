import { makeStyles, createStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      width: theme.spacing(25),
      height: theme.spacing(25),
    },
    avatarIcon: {
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
  }),
);

export default useStyles;
