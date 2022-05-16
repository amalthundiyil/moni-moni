import {
  verifyTokenService,
  userLoginService,
  userLogoutService,
} from "./services";
import {
  verifyTokenStarted,
  verifyTokenEnd,
  userLoginStarted,
  userLoginFailure,
  verifyUserSuccess,
  userLogout,
} from "./authSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";

const verifyTokenAsync =
  (silentAuth = false) =>
  async (dispatch) => {
    dispatch(verifyTokenStarted(silentAuth));

    const result = await verifyTokenService();

    if (result.error) {
      dispatch(verifyTokenEnd());
      if (result.response && [401, 403].includes(result.response.status))
        dispatch(userLogout());
      return;
    }
    if (result.status === 204) dispatch(verifyTokenEnd());
    else dispatch(verifyUserSuccess(result.data));
  };

const userLoginAsync = (username, password) => async (dispatch) => {
  dispatch(userLoginStarted());

  const result = await userLoginService(username, password);

  if (result.error) {
    dispatch(userLoginFailure({ error: result.response.data.msg }));
    return;
  }
  dispatch(verifyUserSuccess(result.data));
};

const userLogoutAsync = () => (dispatch) => {
  dispatch(userLogout());
  userLogoutService();
};

export { verifyTokenAsync, userLoginAsync, userLogoutAsync };
