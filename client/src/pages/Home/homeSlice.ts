import { combineReducers } from "@reduxjs/toolkit";

import userListReducer from "./UserList/userListSlice";
import postFormReducer from "./PostForm/postFormSlice";

const reducer = combineReducers({
  postForm: postFormReducer,
  userList: userListReducer,
});

export default reducer;
