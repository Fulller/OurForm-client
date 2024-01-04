import axios from "axios";
import { apiUrl } from "~/configs";
import { getAuthUrl } from "~/tools/url.tool";
import { getHeaders } from "./header.tool";
import _ from "lodash";

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
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = _.get(error, "response.status", 400);
    if (status === 403) {
      window.location.href = getAuthUrl("/google");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
