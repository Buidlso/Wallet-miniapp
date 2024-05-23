import _axios, { AxiosError } from "axios";

const SERVER_URL = process.env.SERVER_URL;

const axios = _axios.create({
  baseURL: "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axios;
