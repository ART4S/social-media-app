import { configureStore, ThunkAction, AnyAction } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";

import homeSagas from "pages/Home/homeSagas";

import commonReducer from "pages/commonSlice";
import homeReducer from "pages/Home/homeSlice";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
  reducer: {
    common: commonReducer,
    home: homeReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

sagaMiddleware.run(homeSagas);

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  AnyAction
>;

export default store;
