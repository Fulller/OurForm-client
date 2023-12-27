import { getApiUrl } from "../tools/url.tool";
import axios from "axios";
import { getHeaders } from "../tools/header.tool";

const OptionService = {
  update: ({ _id, text }) => {
    return axios
      .patch(
        getApiUrl(`/option/${_id}/update`),
        { text },
        {
          headers: getHeaders(),
        }
      )
      .then(() => true)
      .catch(() => false);
  },
};
export default OptionService;
