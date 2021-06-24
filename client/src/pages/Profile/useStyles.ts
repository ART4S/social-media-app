import { makeStyles, createStyles, Theme } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {},
    body: {
      marginTop: theme.spacing(12),
    },
    avatar: {
      width: theme.spacing(20),
      height: theme.spacing(20),
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
  })
);

export default useStyles;
