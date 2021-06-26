import { makeStyles, createStyles, Theme } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      textTransform: "uppercase",
    },
    avatar: {
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
    userName: {
      fontWeight: "bold",
    },
    userEmail: {
      color: grey[500],
    },
    joinDate: {
      color: grey[500],
    },
    tabs: {
      width: "100%",
    },
  }),
);

export default useStyles;
