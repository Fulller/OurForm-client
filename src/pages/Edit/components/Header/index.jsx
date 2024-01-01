import { useEffect, useRef } from "react";
import SettingService from "../../../../services/setting.service";
import useDebouncedApiCall from "../../../../hooks/useDebouncedApiCall";
import useFocus from "../../../../hooks/useFocus";
import editFormSelector from "../../../../redux/selectors/edit_form.selector";
import editFormSlide from "../../../../redux/slides/edit_form.slide";
import { useDispatch, useSelector } from "react-redux";
import TextArea from "../TextArea";
import _ from "lodash";
import AddButton from "../AddButton";
import TextEditor from "../TextEditor";
import ".scss";

function Header({ setting }) {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [isFocus] = useFocus(ref, false);
  const { title, describe } = setting;
  const totalScores = useSelector(editFormSelector.totalScores());
  const debouncedUpdate = useDebouncedApiCall(SettingService.update, 1000);
  useEffect(() => {
    (async () => {
      await debouncedUpdate(setting);
    })();
  }, [setting, debouncedUpdate]);
  function handleUpdate({ key, value }) {
    value = _.replace(value, /\n/g, "");
    dispatch(editFormSlide.actions.updateSetting({ key, value }));
  }
  if (isFocus) {
    return (
      <div className="header focus" ref={ref}>
        <div className="header-modify">
          <TextEditor
            value={title}
            placeholder="Tiêu đề biểu mẫu"
            handleTextChange={(value) =>
              handleUpdate({ key: "title", value: value })
            }
            className="title"
          ></TextEditor>
          <TextArea
            value={describe}
            placeholder="Mô tả biểu mẫu"
            handleTextChange={(e) =>
              handleUpdate({ key: "describe", value: e.target.value })
            }
            className="describe"
          ></TextArea>
          <AddButton index={-1}></AddButton>
        </div>
      </div>
    );
  } else {
    return (
      <div className="header" ref={ref}>
        <div className="header-normal">
          <div
            className="title"
            dangerouslySetInnerHTML={{ __html: title || "Tiêu đề form" }}
          ></div>
          <p className="describe">{describe}</p>
          <div className="wrap-score">
            {totalScores > 0 && (
              <span className="score">({totalScores} scores)</span>
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default Header;
