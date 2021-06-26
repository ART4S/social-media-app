import { makeStyles, createStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
    userName: {
      fontWeight: "bold",
    },
    deleteButton: {
      width: theme.spacing(4),
      height: theme.spacing(4),
      opacity: 0,
      transition: "opacity 0.2s ease-in",
      "&:hover": {
        opacity: 1,
      },
    },
    deleteIcon: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
  }),
);

export default useStyles;
