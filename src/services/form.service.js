import { getApiUrl } from "../tools/url.tool";
import { getDataApi } from "../tools/lodash.toll";
import axios from "../tools/axios.tool";

const FormService = {
  create: () => {
    return axios
      .post(getApiUrl("/form/create"))
      .then((data) => getDataApi(data, "form"))
      .catch(() => {
        return null;
      });
  },
  get: (id) => {
    return axios
      .get(getApiUrl("/form/get/" + id))
      .then((data) => getDataApi(data, "form"))
      .catch(() => null);
  },
  addQuestion: (id, type, index) => {
    return axios
      .post(getApiUrl(`/form/question/add/${id}/${type}`), {
        index,
      })
      .then((data) => getDataApi(data, "question"))
      .catch(() => null);
  },
  deleteQuestion: ({ _id, questionId }) => {
    return axios
      .delete(getApiUrl(`/form/question/delete/${_id}/${questionId}`))
      .then((data) => getDataApi(data, "question"))
      .catch(() => null);
  },
  updateIndeQuestions: (id, questions) => {
    return axios
      .patch(getApiUrl(`/form/question/update/${id}`), {
        questions,
      })
      .then(() => true)
      .catch(() => false);
  },
};
export default FormService;
