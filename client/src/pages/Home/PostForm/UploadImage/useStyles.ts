import { makeStyles, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
  }),
);

export default useStyles;
