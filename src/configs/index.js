import _ from "lodash";

const apiUrl = _.get(
  import.meta.env,
  "VITE_API_URL",
  "http://localhost:8000/api/v1"
);
const authUrl = _.get(
  import.meta.env,
  "VITE_AUTH_URL",
  "http://localhost:8000"
);
const intervalRefreshToken =
  _.chain(import.meta.env)
    .get("VITE_INTERVAL_REFRESHTOKEN", "3600")
    .toNumber()
    .value() * 1000;

export { apiUrl, authUrl, intervalRefreshToken };
