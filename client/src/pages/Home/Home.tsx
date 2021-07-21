import React from "react";
import { Grid, Box } from "@material-ui/core";

import Header from "components/Header/Header";
import PostList, { usePostList } from "components/PostList/PostList";
import useAppSelector from "hooks/useAppSelector";
import { getUser } from "redux/commonSlice";

import PostForm from "./PostForm/PostForm";
import UserList from "./UserList/UserList";

export default function Home(): JSX.Element {
  const userId = useAppSelector((state) => getUser(state).id);

  const _ = usePostList(userId);

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
            <UserList />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
