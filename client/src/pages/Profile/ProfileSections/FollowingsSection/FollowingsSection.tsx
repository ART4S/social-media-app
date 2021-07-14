import React from "react";
import { Box } from "@material-ui/core";
import FollowingList from "./FollowingList/FollowingList";
import FollowingsSearch from "./FollowingsSearch/FollowingsSearch";

export default function FollowingsSection(): JSX.Element {
  return (
    <Box display="flex" flexDirection="column">
      <FollowingsSearch />

      <Box mt={2}>
        <FollowingList />
      </Box>
    </Box>
  );
}
