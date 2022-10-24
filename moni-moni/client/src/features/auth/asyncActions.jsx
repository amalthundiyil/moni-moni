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

const userLoginAsync = (email, password) => async (dispatch) => {
  dispatch(userLoginStarted());

  const result = await userLoginService(email, password);
  if (result.error) {
    dispatch(userLoginFailure({ error: result.response.data.msg }));
    return {
      message: JSON.stringify(result.response.data) || "Error Occurred",
      type: "error",
    };
  }
  dispatch(verifyUserSuccess(result.data));
  return {
    message: "Logged in successfully",
    type: "success",
  };
};

const userLogoutAsync = () => async (dispatch) => {
  dispatch(userLogout());
  const result = await userLogoutService();
  if (result.error) {
    return {
      message: JSON.stringify(result.response.data) || "Error Occurred",
      type: "error",
    };
  }
  return {
    message: "Logged out successfully",
    type: "success",
  };
};

export { verifyTokenAsync, userLoginAsync, userLogoutAsync };
