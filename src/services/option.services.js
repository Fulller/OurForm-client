import { getApiUrl } from "../tools/url.tool";
import axios from "../tools/axios.tool";

const OptionService = {
  update: ({ _id, text }) => {
    return axios
      .patch(getApiUrl(`/option/${_id}/update`), { text })
      .then(() => true)
      .catch(() => false);
  },
};
export default OptionService;
