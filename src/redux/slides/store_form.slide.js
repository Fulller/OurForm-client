import { createSlice } from "@reduxjs/toolkit";
import { produce } from "immer";

export default createSlice({
  name: "store_form",
  initialState: null,
  reducers: {
    set: produce((state, { payload }) => {
      const { store } = payload;
      return store;
    }),
  },
});
