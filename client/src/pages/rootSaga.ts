import { all } from "@redux-saga/core/effects";
import homeSagas from "./Home/homeSagas";
import profileSagas from "./Profile/profileSagas";

export default function* rootSaga() {
  yield all([homeSagas(), profileSagas()]);
}
