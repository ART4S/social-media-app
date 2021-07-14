import { combineReducers } from "@reduxjs/toolkit";
import profileCommonReducer from "./profileCommonSlice";
import followingsSectionReducer from "./ProfileSections/FollowingsSection/followingsSectionSlice";
import followersSectionReducer from "./ProfileSections/FollowersSection/followersSectionSlice";

const reducer = combineReducers({
  common: profileCommonReducer,
  followingsSection: followingsSectionReducer,
  followersSection: followersSectionReducer,
});

export default reducer;
