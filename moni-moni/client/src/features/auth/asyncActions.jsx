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
import CustomizedSnackbars from "../../components/Snackbar";

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
  console.log("hello");
  console.log(result);
  if (result.error) {
    dispatch(userLoginFailure({ error: result.response.data.msg }));
    return (
      <CustomizedSnackbars message={result.response.data.msg} type={"error"} />
    );
  }
  dispatch(verifyUserSuccess(result.data));
  return (
    <CustomizedSnackbars message={"Logged in successfully"} type={"success"} />
  );
};

const userLogoutAsync = () => (dispatch) => {
  dispatch(userLogout());
  userLogoutService();
};

export { verifyTokenAsync, userLoginAsync, userLogoutAsync };
