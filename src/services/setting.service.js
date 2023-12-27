import { getApiUrl } from "../tools/url.tool";
import axios from "axios";
import { getHeaders } from "../tools/header.tool";
import _ from "lodash";

const SettingService = {
  update: (setting) => {
    setting = _.pick(setting, ["_id", "title", "describe"]);
    return axios
      .patch(getApiUrl("/setting/update"), setting, {
        headers: getHeaders(),
      })
      .then((data) => true)
      .catch((err) => false);
  },
};
export default SettingService;
