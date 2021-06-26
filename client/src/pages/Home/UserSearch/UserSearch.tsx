import React from "react";
import {
  Paper,
  Avatar,
  Box,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { PhotoCameraOutlined } from "@material-ui/icons";

import users from "mock/users";

export default function UserSearch(): JSX.Element {
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
            <ListItem key={x.id} button>
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
