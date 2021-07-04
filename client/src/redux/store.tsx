import { configureStore, ThunkAction, AnyAction } from "@reduxjs/toolkit";

import homeReducer from "pages/Home/homeSlice";

const store = configureStore({
  reducer: {
    home: homeReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  AnyAction
>;

export default store;
