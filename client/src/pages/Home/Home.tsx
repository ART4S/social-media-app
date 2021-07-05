import React from "react";
import { Grid, Box } from "@material-ui/core";
import Header from "components/Header/Header";
import PostList from "./PostList/PostList";
import PostForm from "./PostForm/PostForm";
import UserSearch from "./UserSearch/UserSearch";
import useAppDispatch from "hooks/useAppDispatch";

export default function Home(): JSX.Element {
  return (
    <div>
      <Header />

      <Box padding={10}>
        <Grid container spacing={10}>
          <Grid item container direction="column" xs={6} spacing={2}>
            <Grid item xs>
              <PostForm />
            </Grid>

            <Grid item xs>
              <PostList />
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
