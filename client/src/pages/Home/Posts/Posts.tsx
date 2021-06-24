import React from "react";
import { Grid, GridSpacing } from "@material-ui/core";
import Post from "../Post/Post";
import posts from "mock/posts";

const SPACING: GridSpacing = 2;

export default function Posts() {
  return (
    <Grid container spacing={SPACING} direction="column">
      {posts.map((x) => (
        <Grid item>
          <Post data={x} />
        </Grid>
      ))}
    </Grid>
  );
}
