import { getAuthUrl } from "../tools/url.tool";
import { getHeaders } from "../tools/header.tool";
import axios from "../tools/axios.tool";

export const getProfile = () => {
  return axios
    .get(getAuthUrl("/profile"))
    .then((data) => data.data.metadata.profile)
    .catch(() => null);
};
export const logOut = () => {
  return axios
    .get(getAuthUrl("/logout"))
    .then(() => true)
    .catch(() => null);
};
export const refreshToken = () => {
  return axios.get(getAuthUrl("/refreshtoken"), {
    headers: getHeaders(["accesstoken", "refreshtoken"]),
  });
};
