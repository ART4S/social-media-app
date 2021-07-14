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
  Typography,
} from "@material-ui/core";
import { PhotoCameraOutlined } from "@material-ui/icons";
import useAppDispatch from "hooks/useAppDispatch";
import { actions, getLoading, getSearchText, getUsers } from "./userListSlice";
import useAppSelector from "hooks/useAppSelector";
import Progress from "components/Progress/Progress";
import { getUserName } from "utils/userUtils";

export default function UserList(): JSX.Element {
  const dispatch = useAppDispatch();

  const loading = useAppSelector(getLoading);

  const searchText = useAppSelector(getSearchText);

  const users = useAppSelector(getUsers);

  React.useEffect(() => {
    dispatch(actions.searchUsers());
  }, []);

  return (
    <Paper elevation={4}>
      <Box padding={2}>
        <TextField
          id="searchText"
          placeholder="Search user..."
          value={searchText}
          onChange={(e) => dispatch(actions.changeSearchText(e.target.value))}
          variant="outlined"
          InputProps={{
            endAdornment: <>{loading && <Progress size={20} />}</>,
          }}
          fullWidth
        />

        {!users.length && !loading && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={2}
          >
            <Typography color="textSecondary" align="center">
              No matching users...
            </Typography>
          </Box>
        )}

        {!!users.length && (
          <List>
            {users.map((x) => (
              <ListItem key={x.id} button>
                <ListItemIcon>
                  <Avatar src={x.avatarUrl}>
                    <PhotoCameraOutlined />
                  </Avatar>
                </ListItemIcon>

                <ListItemText primary={getUserName(x)} />
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Paper>
  );
}
