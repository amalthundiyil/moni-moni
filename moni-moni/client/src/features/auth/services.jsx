import axios from "../../utils/axios";

axios.defaults.withCredentials = true;

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const verifyTokenService = async () => {
  try {
    return await axios.post("/api/v1/auth/token/refresh/");
  } catch (err) {
    return {
      error: true,
      response: err.response,
    };
  }
};

export const userLoginService = async (email, password) => {
  const body = { email, password };
  try {
    return await axios.post("/api/v1/auth/login/", body);
  } catch (err) {
    return {
      error: true,
      response: err.response,
    };
  }
};

export const userLogoutService = async () => {
  try {
    return await axios.post("/api/v1/auth/logout/");
  } catch (err) {
    return {
      error: true,
      response: err.response,
    };
  }
};
