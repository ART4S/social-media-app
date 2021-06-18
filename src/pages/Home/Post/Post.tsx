import { Typography, Link } from "@material-ui/core";
import {
  Paper,
  IconButton,
  Avatar,
  Box,
  TextField,
  Grid,
  Button,
  Collapse,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { PhotoCameraOutlined } from "@material-ui/icons";

import IPost from "model/Post";
import moment from "moment";
import useStyles from "./useStyles";

type PostProps = { data: IPost };

export default function Post({ data }: PostProps): JSX.Element {
  const classes = useStyles();

  return (
    <Paper elevation={3}>
      <div className={classes.header}>
        <div className={classes.info}>
          <Avatar className={classes.avatar} src={data.authorAvatarUrl}>
            <PhotoCameraOutlined />
          </Avatar>

          <Box display="flex" flexDirection="column">
            <Link>
              <Typography>{data.authorName}</Typography>
            </Link>

            <Typography variant="subtitle2">
              {moment(data.createdAt).fromNow()}
            </Typography>
          </Box>
        </div>

        <IconButton>
          <DeleteIcon color="secondary" />
        </IconButton>
      </div>

      <Typography className={classes.body} variant="body1">
        {data.body}
      </Typography>

      <div className={classes.footer}>
        <form className={classes.commentForm}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Avatar>
              <PhotoCameraOutlined />
            </Avatar>

            <TextField id="comment" label="Comment" value="" fullWidth />
          </div>

          <Collapse in style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button>Add</Button>
          </Collapse>
        </form>
      </div>
    </Paper>
  );
}
