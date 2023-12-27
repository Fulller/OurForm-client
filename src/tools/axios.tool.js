import axios from "axios";
import { apiUrl } from "../configs";
import { getHeaders } from "./header.tool";

const axiosInstance = axios.create({
  baseURL: apiUrl,
});
axiosInstance.interceptors.request.use(
  (config) => {
    const currentHeaders = config.headers;
    const newHeaders = getHeaders();
    config.headers = Object.assign({}, currentHeaders, newHeaders);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
