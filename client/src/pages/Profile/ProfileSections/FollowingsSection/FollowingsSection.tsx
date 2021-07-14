import React from "react";
import { Box, Grid, TextField } from "@material-ui/core";

import TabPanel from "components/TabPanel/TabPanel";
import FollowingList from "./FollowingList/FollowingsList";
import useAppDispatch from "hooks/useAppDispatch";
import { actions } from "./followingsSectionSlice";

export default function FollowingsSection(): JSX.Element {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(actions.fetchFollowings());
  }, []);

  return (
    <Box display="flex" flexDirection="column">
      {/* <TextField
        id="searchText"
        placeholder="Search by followings..."
        value={searchText}
        onChange={(e) => dispatch(actions.changeSearchText(e.target.value))}
        variant="outlined"
        InputProps={{
          endAdornment: <>{loading && <Progress size={20} />}</>,
        }}
        fullWidth
      /> */}

      <Box mt={2}>
        <FollowingList />
      </Box>
    </Box>
  );
}
