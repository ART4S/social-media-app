import React from "react";
import { Box } from "@material-ui/core";
import FollowerList from "./FollowerList/FollowerList";
import FollowersSearch from "./FollowersSearch/FollowersSearch";

export default function FollowersSection(): JSX.Element {
  return (
    <Box display="flex" flexDirection="column">
      <FollowersSearch />

      <Box mt={2}>
        <FollowerList />
      </Box>
    </Box>
  );
}
