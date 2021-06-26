import React from "react";
import { Grid, Box } from "@material-ui/core";
import Header from "common/components/Header/Header";
import PostList from "common/components/PostList/PostList";
import PostForm from "common/components/Forms/PostForm/PostForm";
import UserSearch from "./UserSearch/UserSearch";

import posts from "mock/posts";

export default function Home(): JSX.Element {
  return (
    <div>
      <Header />

      <Box padding={10}>
        <Grid container spacing={10}>
          <Grid item container xs={6} spacing={2} direction="column">
            <Grid item xs>
              <PostForm />
            </Grid>

            <Grid item xs>
              <PostList data={posts} />
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <UserSearch />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
