import { AUTH_TOKEN } from "../constants";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: {
    auth: { token: localStorage.getItem(AUTH_TOKEN) || null },
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
