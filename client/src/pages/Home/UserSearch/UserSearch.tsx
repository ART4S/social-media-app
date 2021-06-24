import React from "react";
import { Typography, Link } from "@material-ui/core";
import {
  Paper,
  IconButton,
  Avatar,
  Box,
  Grid,
  Badge,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { PhotoCameraOutlined } from "@material-ui/icons";
import { debounce } from "lodash";

import users from "mock/users";
import useStyles from "./useStyles";

export default function UserSearch(): JSX.Element {
  const classes = useStyles();
  const [searchText, setSearchText] = React.useState("");

  return (
    <Paper elevation={4}>
      <Box padding={2}>
        <TextField
          id="searchText"
          placeholder="Search user..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          variant="outlined"
          fullWidth
        />

        <List>
          {users.map((x) => (
            <ListItem button>
              <ListItemIcon>
                <Avatar src={x.avatarUrl}>
                  <PhotoCameraOutlined />
                </Avatar>
              </ListItemIcon>
              <ListItemText primary={`${x.firstName} ${x.lastName}`} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Paper>
  );
}
