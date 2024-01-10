import OptionService from "~/services/option.services";
import useDebouncedApiCall from "~/hooks/useDebouncedApiCall";
import { useDispatch } from "react-redux";
import editFormSlide from "~/redux/slides/edit_form.slide";
import _ from "lodash";
import TextArea from "../TextArea";
import ".scss";

function Option({
  questionId,
  option,
  placeholder = "Hãy nhập nội dung của lựa chọn",
  className = "",
}) {
  const dispatch = useDispatch();
  const { _id, text } = option;
  const debouncedUpdate = useDebouncedApiCall(OptionService.update, 500);
  async function handleTextChange(e) {
    const value = _.replace(e.target.value, /\n/g, "");
    await debouncedUpdate({ _id, text: value });
    dispatch(
      editFormSlide.actions.option({
        questionId,
        action: {
          payload: { _id, key: "text", value },
        },
      })
    );
  }

  return (
    <div className={"option-group " + className}>
      <TextArea
        className="option-group-text"
        value={text}
        placeholder={placeholder}
        handleTextChange={handleTextChange}
      ></TextArea>
      <label className="option-group-image">
        <input type="file" hidden />
        <span className="material-symbols-outlined">add_photo_alternate</span>
      </label>
    </div>
  );
}

export default Option;
