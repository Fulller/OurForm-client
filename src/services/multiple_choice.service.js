import { getApiUrl } from "../tools/url.tool";
import axios from "../tools/axios.tool";
import { getDataApi } from "../tools/lodash.toll";

const MultipleChoiceService = {
  addQuestionData: ({ _id }) => {
    return axios
      .post(getApiUrl(`/multiple_choice/${_id}/question_data/add`))
      .then((data) => getDataApi(data, "option"))
      .catch(() => null);
  },
  deleteQuestionData: ({ _id, optionId }) => {
    return axios
      .delete(
        getApiUrl(`/multiple_choice/${_id}/question_data/delete/${optionId}`)
      )
      .then(() => true)
      .catch(() => false);
  },
  updateAnswerData: ({ _id, answer_data }) => {
    return axios
      .patch(getApiUrl(`/multiple_choice/${_id}/answer_data/update`), {
        answer_data,
      })
      .then(() => true)
      .catch(() => false);
  },
};
export default MultipleChoiceService;
