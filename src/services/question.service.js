import axios from "../tools/axios.tool";

const QuestionService = {
  update: (_id, { key, value }) => {
    return axios
      .patch(`/question/update/${_id}`, { key, value })
      .then(() => true)
      .catch(() => false);
  },
};
export default QuestionService;
