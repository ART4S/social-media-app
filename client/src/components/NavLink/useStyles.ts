import { makeStyles, createStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      textDecoration: "none",
      color: "inherit",
      "&:focus, &:hover, &:visited, &:link, &:active": {
        textDecoration: "none",
      },
    },
  }),
);

export default useStyles;
