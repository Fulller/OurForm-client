import { createSlice } from "@reduxjs/toolkit";
import { produce } from "immer";

export default createSlice({
  name: "behavior",
  initialState: {
    edit: {
      questionFocusedId: null,
    },
  },
  reducers: {
    set_edit_questionFocusedId: produce((state, { payload }) => {
      const { _id } = payload;
      state.edit.questionFocusedId = _id;
    }),
  },
});
