import { makeStyles, createStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      "&:hover": {
        cursor: "pointer",
      },
    },
    typo: {
      textTransform: "capitalize",
    },
  }),
);

export default useStyles;
