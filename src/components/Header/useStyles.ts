import { makeStyles, createStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      width: theme.spacing(5),
      height: theme.spacing(5),
      fill: theme.palette.common.white,
    },
  }),
);

export default useStyles;
