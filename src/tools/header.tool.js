import { getLS } from "./localStorage.tool";
import _ from "lodash";

export function getHeaders(headerField = ["accesstoken"]) {
  const accesstoken = getLS("accesstoken", "");
  const refreshtoken = getLS("refreshtoken", "");
  return _.pick(
    {
      accesstoken,
      refreshtoken,
    },
    headerField
  );
}
