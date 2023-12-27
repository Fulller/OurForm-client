import _ from "lodash";

const EditFormSelector = {
  get: function (field) {
    return (state) => {
      if (!field) return state.edit_form;
      return _.get(state.edit_form, field);
    };
  },
  totalScores: function () {
    return (state) => {
      return _.reduce(
        state.edit_form.questions,
        (total, question) => {
          const score = question.has_answer ? question.score : 0;
          return total + score;
        },
        0
      );
    };
  },
  question: function (_id) {
    return (state) => {
      return _.find(_.get(state.edit_form, "questions"), { _id });
    };
  },
  data: function (_id) {
    return (state) => {
      const { data, type } = _.find(_.get(state.edit_form, "questions"), {
        _id,
      });
      return _.get(data, type);
    };
  },
  option: function ({ questionId, optionId }) {
    return (state) => {
      const { data, type } = _.find(_.get(state.edit_form, "questions"), {
        _id: questionId,
      });
      return _.find(_.get(data, `${type}.question_data`), { _id: optionId });
    };
  },
};
export default EditFormSelector;
