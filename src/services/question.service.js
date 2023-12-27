import { getApiUrl } from "../tools/url.tool";
import axios from "axios";
import { getHeaders } from "../tools/header.tool";

const QuestionService = {
  update: (_id, { key, value }) => {
    return axios
      .patch(
        getApiUrl(`/question/update/${_id}`),
        { key, value },
        {
          headers: getHeaders(),
        }
      )
      .then(() => true)
      .catch(() => false);
  },
};
export default QuestionService;
