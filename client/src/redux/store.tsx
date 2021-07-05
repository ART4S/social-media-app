import { configureStore, ThunkAction, AnyAction } from "@reduxjs/toolkit";

import commonReducer from "pages/commonSlice";
import homeReducer from "pages/Home/homeSlice";

const store = configureStore({
  reducer: {
    common: commonReducer,
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
