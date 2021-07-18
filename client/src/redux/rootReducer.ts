import { combineReducers } from "@reduxjs/toolkit";

import common from "pages/commonSlice";
import home from "pages/Home/homeSlice";
import login from "pages/Login/loginSlice";
import registration from "pages/Registration/registrationSlice";
import profile from "pages/Profile/profileSlice";
import profileEditor from "pages/ProfileEditor/profileEditorSlice";
import postList from "components/PostList/postListSlice";

const reducer = combineReducers({
  common,
  home,
  login,
  registration,
  profile,
  profileEditor,
  postList,
});

export default reducer;
