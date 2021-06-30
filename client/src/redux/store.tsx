import { configureStore, ThunkAction, AnyAction } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {},
});

export type AppState = ReturnType<typeof store.dispatch>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  AnyAction
>;
