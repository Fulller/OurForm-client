import { getDataApi } from "~/tools/lodash.toll";
import axios from "~/tools/axios.tool";

const FormService = {
  create: () => {
    return axios
      .post("/form/create")
      .then((data) => getDataApi(data, "form"))
      .catch(() => {
        return null;
      });
  },
  get: (id) => {
    return axios
      .get("/form/get/" + id)
      .then((data) => getDataApi(data, "form"))
      .catch(() => null);
  },
  addQuestion: (id, type, index) => {
    return axios
      .post(`/form/question/add/${id}/${type}`, {
        index,
      })
      .then((data) => getDataApi(data, "question"))
      .catch(() => null);
  },
  deleteQuestion: ({ _id, questionId }) => {
    return axios
      .delete(`/form/question/delete/${_id}/${questionId}`)
      .then((data) => getDataApi(data, "question"))
      .catch(() => null);
  },
  updateIndeQuestions: (id, questions) => {
    return axios
      .patch(`/form/question/update/${id}`, {
        questions,
      })
      .then(() => true)
      .catch(() => false);
  },
  updateOtherQuestionByIndex: ({ _id, index, action }) => {
    return axios
      .patch(`/form/question/other_by_index/${_id}`, {
        index,
        action,
      })
      .then(() => true)
      .catch(() => false);
  },
};
export default FormService;
