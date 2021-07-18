import { makeStyles, createStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    page: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      textAlign: "center",
    },
    title: {
      fontSize: "5rem",
      textTransform: "uppercase",
    },
    link: {
      textDecoration: "inherit",
      marginTop: theme.spacing(4),
      color: theme.palette.primary.main,
    },
  }),
);

export default useStyles;
