import { createSlice } from "@reduxjs/toolkit";

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
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      state.expiredAt = null;
      state.loginStatus = "rejected";
    },
    verifyUserSuccess: (state, action) => {
      const { token } = action.payload;
      state.token = token;
      state.isAuthenticated = true;
      state.verifyStatus = "end";
      state.loginStatus = "fulfilled";
    },
    userLogout: (state) => {},
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
