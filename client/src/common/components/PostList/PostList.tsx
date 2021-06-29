import React from "react";
import { Grid, GridSpacing } from "@material-ui/core";
import Post from "../Post/Post";
import type IPost from "model/Post";

type PostListProps = {
  data: IPost[];
};

export default function PostList({ data }: PostListProps): JSX.Element {
  return (
    <Grid container spacing={2} direction="column">
      {data.map((x) => (
        <Grid key={x.id} item>
          <Post key={x.id} data={x} />
        </Grid>
      ))}
    </Grid>
  );
}
