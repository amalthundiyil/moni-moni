import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  expiredAt: null,
  user: null,
  verifyStatus: "start" || "end",
  isAuthenticated: false,
  loginStatus: "rejected" || "fullfilled" || "loading",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    verifyTokenStarted: (state, action) => {
      const { silentAuth } = action.payload;
      state = silentAuth ? { ...state } : initialState;
    },
    verifyTokenEnd: (state) => {
      state.verifyStatus = "end";
    },
    userLoginStarted: (state) => {
      state.loginStatus = "loading";
    },
    userLoginFailure: (state, action) => {
      const { error } = action.payload;
      state.error = error;
      state.loginStatus = "rejected";
    },
    verifyUserSuccess: (state, action) => {
      const { token, expiredAt, username } = action.payload;
      state.token = token;
      state.expiredAt = expiredAt;
      state.user = username;
      state.isAuthenticated = true;
      state.verifyStatus = "end";
      state.loginStatus = "fulfilled";
    },
    userLogout: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const {
  verifyTokenStarted,
  verifyTokenEnd,
  userLoginStarted,
  userLoginFailure,
  verifyUserSuccess,
  userLogout,
} = authSlice.actions;
export default authSlice.reducer;
