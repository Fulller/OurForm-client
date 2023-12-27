import { useEffect, useReducer } from "react";
import SettingService from "../../../services/setting.service";
import useDebouncedApiCall from "../../../hooks/useDebouncedApiCall";
import editFormSelector from "../../../redux/selectors/edit_form.selector";
import { useSelector } from "react-redux";

const reducer = (state, action) => {
  switch (action.type) {
    case "TITLE":
      return { ...state, title: action.payload };
    case "DESCRIBE":
      return { ...state, describe: action.payload };
    default:
      return state;
  }
};
function Header() {
  const setting = useSelector(editFormSelector.get("setting"));
  const totalScores = useSelector(editFormSelector.totalScores());
  const [settingData, dispatch] = useReducer(reducer, {
    ...setting,
    title: setting.title || "Template has no title",
  });
  const debouncedUpdate = useDebouncedApiCall(SettingService.update, 1000);
  useEffect(() => {
    (async () => {
      await debouncedUpdate(settingData);
    })();
  }, [settingData, debouncedUpdate]);
  return (
    <div className="header">
      <input
        type="text"
        className="title"
        value={settingData.title || ""}
        onChange={(e) => dispatch({ type: "TITLE", payload: e.target.value })}
        placeholder="Tiêu đề biểu mẫu"
        spellCheck={false}
      />
      <input
        type="text"
        className="describe"
        value={settingData.describe || ""}
        onChange={(e) =>
          dispatch({ type: "DESCRIBE", payload: e.target.value })
        }
        placeholder="Mô tả biểu mẫu"
        spellCheck={false}
      />
      <span>{totalScores}scores</span>
    </div>
  );
}
export default Header;
