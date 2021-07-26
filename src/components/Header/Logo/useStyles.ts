import { makeStyles, createStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logo: {
      width: theme.spacing(25),
      height: theme.spacing(8),
      objectFit: "cover",
    },
  }),
);

export default useStyles;
