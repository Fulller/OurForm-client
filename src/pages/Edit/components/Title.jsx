import { useEffect, useRef } from "react";
import QuestionService from "../../../services/question.service";
import useDebouncedApiCall from "../../../hooks/useDebouncedApiCall";
import { useSelector, useDispatch } from "react-redux";
import editFormSelector from "../../../redux/selectors/edit_form.selector";
import editFormSlide from "../../../redux/slides/edit_form.slide";
import _ from "lodash";

function Title({ questionId }) {
  const dispatch = useDispatch();
  const { title } = useSelector(editFormSelector.question(questionId));
  const textareaRef = useRef(null);
  const debouncedUpdate = useDebouncedApiCall(QuestionService.update, 500);
  async function handleTextChange(e) {
    const value = _.replace(e.target.value, /\n/g, "");
    dispatch(
      editFormSlide.actions.updateQuestion({
        _id: questionId,
        key: "title",
        value,
      })
    );
    await debouncedUpdate(questionId, {
      key: "title",
      value: value,
    });
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
  }, [title]);
  return (
    <div className="title-group">
      <textarea
        ref={textareaRef}
        className="title-group-text"
        defaultValue={title}
        value={title}
        onChange={handleTextChange}
        rows={1}
        placeholder="Nhập tiêu đề câu hỏi"
        spellCheck={false}
      />
      <label className="title-group-image">
        <input type="file" hidden />
        <span className="material-symbols-outlined">add_photo_alternate</span>
      </label>
    </div>
  );
}
export default Title;
