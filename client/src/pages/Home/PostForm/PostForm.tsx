import {
  Paper,
  IconButton,
  Avatar,
  Box,
  TextField,
  Button,
  Badge,
  Collapse,
} from "@material-ui/core";
import { Typography, Link } from "@material-ui/core";
import { PhotoCameraOutlined } from "@material-ui/icons";
import useStyles from "./useStyles";

export default function PostForm(): JSX.Element {
  const classes = useStyles();

  return (
    <Paper elevation={4}>
      <div className={classes.header}>
        <Avatar>
          <PhotoCameraOutlined />
        </Avatar>

        <Box ml={2}>
          <Typography variant="h6">User</Typography>
        </Box>
      </div>

      <form>
        <TextField
          id="outlined-multiline-static"
          rows={4}
          placeholder="What's new?"
          variant="outlined"
          rowsMax={7}
          multiline
          fullWidth
        />

        <div className={classes.footer}>
          <Button type="submit" variant="contained" color="primary">
            Post
          </Button>
        </div>
      </form>
    </Paper>
  );
}
