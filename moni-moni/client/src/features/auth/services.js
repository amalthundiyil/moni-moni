import axios from "axios";
axios.defaults.withCredentials = true;

const API_URL = "http://localhost:5000";

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const verifyTokenService = async () => {
  try {
    return await axios.post(`${API_URL}/api/v1/auth/verify`);
  } catch (err) {
    return {
      error: true,
      response: err.response,
    };
  }
};

export const userLoginService = async (username, password) => {
  const body = { username, password };
  try {
    return await axios.post(`${API_URL}/api/v1/auth/login`, body);
  } catch (err) {
    console.log(err);
    return {
      error: true,
      response: err.response,
    };
  }
};

export const userLogoutService = async () => {
  try {
    return await axios.post(`${API_URL}/api/v1/auth/logout`);
  } catch (err) {
    return {
      error: true,
      response: err.response,
    };
  }
};
