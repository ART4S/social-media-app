import { combineReducers } from "@reduxjs/toolkit";

import userListReducer from "./UserList/userListSlice";
import postListReducer from "./PostList/postListSlice";
import postFormReducer from "./PostForm/postFormSlice";

const reducer = combineReducers({
  postForm: postFormReducer,
  postList: postListReducer,
  userList: userListReducer,
});

export default reducer;
