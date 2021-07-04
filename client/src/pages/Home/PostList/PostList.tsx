import React from "react";
import { Grid } from "@material-ui/core";
import Post from "./Post/Post";
import useAppSelector from "hooks/useAppSelector";
import useAppDispatch from "hooks/useAppDispatch";
import { fetchPosts, selectPostIds } from "./postListSlice";

interface PostListProps {
  authorId: string;
}

export default function PostList({ authorId }: PostListProps): JSX.Element {
  const dispatch = useAppDispatch();
  const postIds = useAppSelector(selectPostIds);

  React.useEffect(() => {
    dispatch(fetchPosts(authorId));
  }, []);

  return (
    <Grid container spacing={2} direction="column">
      {postIds.map((id) => (
        <Grid key={id} item>
          <Post postId={id as string} />
        </Grid>
      ))}
    </Grid>
  );
}
