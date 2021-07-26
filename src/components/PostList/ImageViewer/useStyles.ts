import { makeStyles, createStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    content: {
      width: theme.breakpoints.values.md,
      backgroundColor: theme.palette.background.paper,
      "&:focus": {
        outline: "none",
      },
    },
    image: {
      maxWidth: "100%",
      maxHeight: "100%",
      objectFit: "cover",
    },
  }),
);

export default useStyles;
