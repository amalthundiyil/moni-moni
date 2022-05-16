import axios from "../../utils/axios";

axios.defaults.withCredentials = true;

export const setAuthToken = (token, refresh) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
  if (refresh) {
    axios.defaults.headers.common["Refresh-Token"] = refresh;
  } else {
    delete axios.defaults.headers.common["Refresh-Token"];
  }
};

export const verifyTokenService = async () => {
  try {
    return await axios.post("/api/v1/auth/token/refresh/", {
      "content-type": "application/json",
    });
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
    return await axios.post("/api/v1/auth/login/", body, {
      "content-type": "application/json",
    });
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
