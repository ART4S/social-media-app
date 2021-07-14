import { combineReducers } from "@reduxjs/toolkit";
import profileCommonReducer from "./profileCommonSlice";
import followingsSectionReducer from "./ProfileSections/FollowingsSection/followingsSectionSlice";

const reducer = combineReducers({
  common: profileCommonReducer,
  followingsSection: followingsSectionReducer,
});

export default reducer;
