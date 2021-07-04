import { combineReducers } from "@reduxjs/toolkit";

import userSearchReducer from "./UserSearch/userSearchSlice";
import postListReducer from "./PostList/postListSlice";

const reducer = combineReducers({
  userSearch: userSearchReducer,
  postList: postListReducer,
});

export default reducer;
