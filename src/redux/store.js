import { configureStore } from "@reduxjs/toolkit";
import userSlide from "./slides/user.slide";
import settingSlide from "./slides/setting.slide";
import editFormSlide from "./slides/edit_form.slide";
import behaviorSlide from "./slides/behavior.slide";
import storeFormSlide from "./slides/store_form.slide";

import { setLS } from "../tools/localStorage.tool";

const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();
  setLS("setting", state.setting);
  return result;
};

export default configureStore({
  reducer: {
    user: userSlide.reducer,
    setting: settingSlide.reducer,
    edit_form: editFormSlide.reducer,
    behavior: behaviorSlide.reducer,
    store_form: storeFormSlide.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});
