import { configureStore, ThunkAction, AnyAction } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";

import rootSaga from "pages/rootSaga";

import homeReducer from "pages/Home/homeSlice";
import loginReducer from "pages/Login/loginSlice";
import profileRedicer from "pages/Profile/profileSlice";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
  reducer: {
    login: loginReducer,
    home: homeReducer,
    profile: profileRedicer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

sagaMiddleware.run(rootSaga);

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  AnyAction
>;

export default store;
