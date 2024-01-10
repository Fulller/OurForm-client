import { createSlice } from "@reduxjs/toolkit";
import { produce } from "immer";
import { feature } from "~/constans/edit.const";

export default createSlice({
  name: "behavior",
  initialState: {
    edit: {
      questionFocusedId: null,
      feature: feature[0].name,
    },
  },
  reducers: {
    set_edit_questionFocusedId: produce((state, { payload }) => {
      const { _id } = payload;
      state.edit.questionFocusedId = _id;
    }),
    set_edit: produce((state, { payload }) => {
      const { key, value } = payload;
      state.edit[key] = value;
    }),
  },
});
