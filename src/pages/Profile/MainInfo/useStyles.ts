import { makeStyles, createStyles, Theme } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) => {
  const color = grey[500];

  return createStyles({
    avatar: {
      width: theme.spacing(15),
      height: theme.spacing(15),
    },
    userName: {
      fontWeight: "bold",
    },
    userEmail: {
      color,
    },
  });
});

export default useStyles;
