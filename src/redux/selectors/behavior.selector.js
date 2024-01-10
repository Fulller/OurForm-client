import _ from "lodash";

const BehaviorSelector = {
  edit_questionFocusedId: (state) => {
    return state.behavior.edit.questionFocusedId;
  },
  edit: (key = "") => {
    return (state) => {
      return _.get(state.behavior.edit, key, null);
    };
  },
};
export default BehaviorSelector;
