import React from "react";
import { Box } from "@material-ui/core";
import PostList from "components/PostList/PostList";
import useAppSelector from "hooks/useAppSelector";
import { getProfile } from "pages/Profile/profileSlice";

export default function PostsSection(): JSX.Element {
  const userId = useAppSelector((state) => getProfile(state).userId);

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <PostList userId={userId} />
    </Box>
  );
}
