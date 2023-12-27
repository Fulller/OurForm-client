import { getApiUrl } from "../tools/url.tool";
import { getDataApi } from "../tools/lodash.toll";
import axios from "axios";
import { getHeaders } from "../tools/header.tool";

const FormService = {
  create: () => {
    return axios
      .post(
        getApiUrl("/form/create"),
        {},
        {
          headers: getHeaders(),
        }
      )
      .then((data) => getDataApi(data, "form"))
      .catch((err) => {
        return null;
      });
  },
  get: (id) => {
    return axios
      .get(getApiUrl("/form/get/" + id), {
        headers: getHeaders(),
      })
      .then((data) => getDataApi(data, "form"))
      .catch((err) => null);
  },
  addQuestion: (id, type, index) => {
    return axios
      .post(
        getApiUrl(`/form/question/add/${id}/${type}`),
        {
          index,
        },
        {
          headers: getHeaders(),
        }
      )
      .then((data) => getDataApi(data, "question"))
      .catch((err) => null);
  },
  deleteQuestion: ({ _id, questionId }) => {
    return axios
      .delete(getApiUrl(`/form/question/delete/${_id}/${questionId}`), {
        headers: getHeaders(),
      })
      .then((data) => getDataApi(data, "question"))
      .catch((err) => null);
  },
  updateIndeQuestions: (id, questions) => {
    return axios
      .patch(
        getApiUrl(`/form/question/update/${id}`),
        {
          questions,
        },
        {
          headers: getHeaders(),
        }
      )
      .then((data) => true)
      .catch((err) => false);
  },
};
export default FormService;
