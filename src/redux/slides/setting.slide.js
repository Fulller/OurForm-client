import { createSlice } from "@reduxjs/toolkit";
import { getLS } from "../../tools/localStorage.tool";
import _ from "lodash";

export default createSlice({
  name: "setting",
  initialState: getLS("setting", {}),
  reducers: {
    setLanguage: (state, action) => {
      return _.set(state, "language", action.payload);
    },
  },
});
