import axios from "axios";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_SCHEME}://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`,
});

export default instance;
