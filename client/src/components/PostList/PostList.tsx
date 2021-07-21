import React from "react";
import { Grid } from "@material-ui/core";
import { useHistory } from "react-router";

import useAppSelector from "hooks/useAppSelector";
import useAppDispatch from "hooks/useAppDispatch";
import { actions, getLoaded, getPostIds } from "components/PostList/postListSlice";

import Post from "./Post/Post";

export default function PostList(): JSX.Element {
  const postIds = useAppSelector(getPostIds);

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

export function usePostList(userId: string) {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const loaded = useAppSelector(getLoaded);
  const hasAnyPosts = useAppSelector((state) => !!getPostIds(state).length);

  React.useEffect(() => {
    if (!loaded) {
      dispatch(actions.fetchPosts(userId));
    }
  }, [userId, loaded]);

  // TODO: not fires when using backward/forward arrows inside browser window
  React.useEffect(() => history.listen(() => dispatch(actions.reset())), []);

  return [loaded, hasAnyPosts] as const;
}
