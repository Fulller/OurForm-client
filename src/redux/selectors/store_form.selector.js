import _ from "lodash";

const storeFormSelector = {
  get: (state) => {
    return _.get(state, "store_form", null);
  },
};
export default storeFormSelector;
