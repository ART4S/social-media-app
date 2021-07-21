import React from "react";
import { Box, Typography } from "@material-ui/core";

import PostList, { usePostList } from "components/PostList/PostList";
import useAppSelector from "hooks/useAppSelector";
import { getProfile } from "pages/Profile/profileSlice";
import Progress from "components/Progress/Progress";

export default function PostsSection(): JSX.Element {
  const userId = useAppSelector((state) => getProfile(state).userId);

  const [loaded, hasAnyPosts] = usePostList(userId);

  function Content() {
    if (!loaded) {
      return <Progress />;
    }

    if (!hasAnyPosts) {
      return <Typography color="textSecondary">There are no posts yet</Typography>;
    }

    return <PostList />;
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Content />
    </Box>
  );
}
