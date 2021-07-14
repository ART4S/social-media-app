import { all } from "@redux-saga/core/effects";
import followingsSectionSagas from "./ProfileSections/FollowingsSection/followingsSectionSagas";
import profileCommonSagas from "./profileCommonSagas";

export default function* profileSagas() {
  yield all([profileCommonSagas(), followingsSectionSagas()]);
}
