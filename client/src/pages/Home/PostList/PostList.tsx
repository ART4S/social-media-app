import React from "react";
import { Grid } from "@material-ui/core";
import Post from "./Post/Post";
import useAppSelector from "hooks/useAppSelector";
import useAppDispatch from "hooks/useAppDispatch";
import { fetchUserPosts, getPostIds } from "./postListSlice";

export default function PostList(): JSX.Element {
  const dispatch = useAppDispatch();
  const postIds = useAppSelector(getPostIds);

  React.useEffect(() => {
    dispatch(fetchUserPosts());
  }, []);

  return (
    <Grid container spacing={2} direction="column">
      {postIds.map((id) => (
        <Grid key={id} item>
          <Post postId={id} />
        </Grid>
      ))}
    </Grid>
  );
}
