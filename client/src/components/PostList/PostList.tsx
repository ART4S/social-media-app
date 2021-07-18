import React from "react";
import { Grid, Box, Paper } from "@material-ui/core";
import Post from "./Post/Post";
import useAppSelector from "hooks/useAppSelector";
import useAppDispatch from "hooks/useAppDispatch";
import { actions, getLoaded, getPostIds } from "./postListSlice";
import Progress from "components/Progress/Progress";

interface PostListProps {
  userId: string;
}

export default function PostList({ userId }: PostListProps): JSX.Element {
  const dispatch = useAppDispatch();

  const postIds = useAppSelector(getPostIds);

  const loaded = useAppSelector(getLoaded);

  React.useEffect(() => {
    return () => {
      dispatch(actions.reset());
    };
  }, []);

  React.useEffect(() => {
    dispatch(actions.fetchPosts(userId));
  }, [userId]);

  return loaded ? (
    <Grid container spacing={2} direction="column">
      {postIds.map((id) => (
        <Grid key={id} item>
          <Post postId={id} />
        </Grid>
      ))}
    </Grid>
  ) : (
    <Spinner />
  );
}

function Spinner() {
  return (
    <Paper elevation={4} style={{ width: "100%" }}>
      <Box py={2}>
        <Progress />
      </Box>
    </Paper>
  );
}
