import { AUTH_TOKEN } from "./../constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
}

const initialState: AuthState = { token: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, { payload }: PayloadAction<string | null>) {
      if (payload) localStorage.setItem(AUTH_TOKEN, payload);
      else localStorage.removeItem(AUTH_TOKEN);

      state.token = payload;
    },
  },
});

export const { setToken } = authSlice.actions;
export default authSlice.reducer;
