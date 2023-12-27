import { getApiUrl } from "../tools/url.tool";
import axios from "../tools/axios.tool";
import _ from "lodash";

const SettingService = {
  update: (setting) => {
    setting = _.pick(setting, ["_id", "title", "describe"]);
    return axios
      .patch(getApiUrl("/setting/update"), setting)
      .then(() => true)
      .catch(() => false);
  },
};
export default SettingService;
