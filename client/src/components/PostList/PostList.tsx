import React from "react";
import { Grid } from "@material-ui/core";
import Post from "./Post/Post";
import useAppSelector from "hooks/useAppSelector";
import useAppDispatch from "hooks/useAppDispatch";
import { actions, getLoaded, getPostIds } from "./postListSlice";
import { useHistory } from "react-router-dom";

interface PostListProps {
  userId: string;
}

export default function PostList({ userId }: PostListProps): JSX.Element {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const loaded = useAppSelector(getLoaded);
  const postIds = useAppSelector(getPostIds);

  React.useEffect(() => {
    if (!loaded) {
      dispatch(actions.fetchPosts(userId));
    }
  }, [userId, loaded]);

  React.useEffect(() => history.listen(() => dispatch(actions.reset())), []);

  return (
    <>
      {loaded && (
        <Grid container spacing={2} direction="column">
          {postIds.map((id) => (
            <Grid key={id} item>
              <Post postId={id} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}
