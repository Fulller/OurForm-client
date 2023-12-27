import { getAuthUrl } from "../tools/url.tool";
import axios from "axios";
import { getHeaders } from "../tools/header.tool";
import { setLS } from "../tools/localStorage.tool";
import _ from "lodash";

export const getProfile = () => {
  return axios
    .get(getAuthUrl("/profile"), {
      withCredentials: true,
      headers: getHeaders(),
    })
    .then((data) => data.data.metadata.profile)
    .catch((err) => null);
};
export const logOut = () => {
  return axios
    .get(getAuthUrl("/logout"), {
      withCredentials: true,
      headers: getHeaders(),
    })
    .then((data) => {
      setLS("accesstoken", null);
      setLS("refreshtoken", null);
      return data.data;
    })
    .catch((err) => null);
};
export const refreshToken = () => {
  return axios
    .get(getAuthUrl("/refreshtoken"), {
      withCredentials: true,
      headers: getHeaders(["refreshtoken"]),
    })
    .then((data) => {
      const accesstoken = _.get(data, "data.metadata.accessToken", "");
      setLS("accesstoken", accesstoken);
      return accesstoken;
    });
};
