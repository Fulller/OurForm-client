import { apiUrl, authUrl } from "../configs";

const getApiUrl = (path) => {
  return `${apiUrl}${path}`;
};

const getAuthUrl = (path) => {
  return `${authUrl}/auth${path}`;
};

export { getApiUrl, getAuthUrl };
