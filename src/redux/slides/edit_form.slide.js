import { createSlice } from "@reduxjs/toolkit";
import { produce } from "immer";

export default createSlice({
  name: "edit_form",
  initialState: null,
  reducers: {
    initForm: produce((state, { payload }) => {
      const { form } = payload;
      return form;
    }),
    updateSetting: produce((form, { payload }) => {
      const { key, value } = payload;
      const setting = form.setting;
      setting[key] = value;
    }),
    updateQuestionOrder: produce((form, { payload }) => {
      form.questions = payload.questions;
    }),
    addQuestion: produce((form, { payload }) => {
      const { questions } = form;
      const { question, index } = payload;
      form.questions = [
        ...questions.slice(0, index),
        question,
        ...questions.slice(index),
      ];
    }),
    deleteQuestion: produce((form, { payload }) => {
      const { _id } = payload;
      form.questions = form.questions.filter(
        (question) => question._id !== _id
      );
    }),
    updateQuestion: produce((form, { payload }) => {
      const { _id, key, value } = payload;
      const questionToUpdate = form.questions.find(
        (question) => question._id === _id
      );
      if (questionToUpdate) {
        questionToUpdate[key] = value;
      }
    }),
    multiple_choice: produce((form, action) => {
      const {
        questionId,
        action: { type, payload },
      } = action.payload;
      const question = form.questions.find(
        (question) => question._id === questionId
      );
      const multipleChoice = question.data.multiple_choice;
      switch (type) {
        case "answer_data": {
          const { _id } = payload;
          multipleChoice.answer_data = _id;
          break;
        }
        case "question_data/delete": {
          const { _id } = payload;
          multipleChoice.question_data = multipleChoice.question_data.filter(
            (option) => option._id !== _id
          );
          break;
        }
        case "question_data/add": {
          const { option } = payload;
          multipleChoice.question_data.push(option);
          break;
        }
        case "question_data/orther": {
          const { question_data } = payload;
          multipleChoice.question_data = question_data;
          break;
        }
        default: {
          break;
        }
      }
    }),
    option: produce((form, action) => {
      const {
        questionId,
        action: {
          payload: { _id, key, value },
        },
      } = action.payload;
      const question = form.questions.find(
        (question) => question._id === questionId
      );
      const option = question.data[question.type].question_data.find(
        (_option) => _option._id === _id
      );
      option[key] = value;
    }),
  },
});
