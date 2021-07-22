import React from "react";
import { Box } from "@material-ui/core";

import Header from "components/Header/Header";
import PostList, { usePostList } from "components/PostList/PostList";
import useAppSelector from "hooks/useAppSelector";
import { getUser } from "redux/commonSlice";

import PostForm from "./PostForm/PostForm";
import UserList from "./UserList/UserList";

const SPACING = 5;

export default function Home(): JSX.Element {
  const userId = useAppSelector((state) => getUser(state).id);

  const _ = usePostList(userId);

  return (
    <div>
      <Header />

      <Box display="flex" justifyContent="center" flexWrap="nowrap" my={10} px={SPACING}>
        <Box display="flex" flexDirection="column" width={2 / 5}>
          <Box>
            <PostForm />
          </Box>

          <Box mt={SPACING}>
            <PostList />
          </Box>
        </Box>

        <Box ml={SPACING} width={2 / 5}>
          <UserList />
        </Box>
      </Box>
    </div>
  );
}
