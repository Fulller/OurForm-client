import { useEffect, useRef } from "react";
import OptionService from "../../../services/option.services";
import useDebouncedApiCall from "../../../hooks/useDebouncedApiCall";
import { useDispatch } from "react-redux";
import editFormSlide from "../../../redux/slides/edit_form.slide";
import _ from "lodash";

function Option({
  questionId,
  option,
  placeholder = "Hãy nhập nội dung của lựa chọn",
}) {
  const dispatch = useDispatch();
  const { _id, text } = option;
  const textareaRef = useRef(null);
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
  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
      const initialHeight = textarea.scrollHeight;
      if (initialHeight > textarea.clientHeight) {
        textarea.style.height = `${initialHeight}px`;
      }
    }
  }, [text]);
  return (
    <div className="option-group">
      <textarea
        ref={textareaRef}
        className="option-group-text"
        defaultValue={text}
        value={text}
        onChange={handleTextChange}
        rows={1}
        placeholder={placeholder}
        spellCheck={false}
      />
      <label className="option-group-image">
        <input type="file" hidden />
        <span className="material-symbols-outlined">add_photo_alternate</span>
      </label>
    </div>
  );
}

export default Option;
