import { all } from "@redux-saga/core/effects";
import homeSagas from "pages/Home/homeSagas";
import profileSagas from "pages/Profile/profileSagas";
import profileEditorSagas from "pages/ProfileEditor/profileEditorSagas";
import loginSagas from "pages/Login/loginSagas";
import registrationSagas from "pages/Registration/registrationSagas";
import commonSagas from "redux/commonSagas";
import postListSagas from "components/PostList/postListSagas";

export default function* rootSaga() {
  yield all([
    commonSagas(),
    homeSagas(),
    loginSagas(),
    registrationSagas(),
    profileSagas(),
    profileEditorSagas(),
    postListSagas(),
  ]);
}
