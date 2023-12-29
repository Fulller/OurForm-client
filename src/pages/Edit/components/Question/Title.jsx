import QuestionService from "../../../../services/question.service";
import useDebouncedApiCall from "../../../../hooks/useDebouncedApiCall";
import { useSelector, useDispatch } from "react-redux";
import editFormSelector from "../../../../redux/selectors/edit_form.selector";
import editFormSlide from "../../../../redux/slides/edit_form.slide";
import TextEditor from "../TextEditor";

function Title({ questionId }) {
  const dispatch = useDispatch();
  const { title } = useSelector(editFormSelector.question(questionId));
  const debouncedUpdate = useDebouncedApiCall(QuestionService.update, 500);
  async function handleTextChange(value) {
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
  return (
    <div className="title-group">
      <TextEditor
        className="title-group-text"
        value={title}
        handleTextChange={handleTextChange}
        placeholder="Nhập tiêu đề câu hỏi"
      ></TextEditor>
      <label className="title-group-image">
        <input type="file" hidden />
        <span className="material-symbols-outlined">add_photo_alternate</span>
      </label>
    </div>
  );
}
export default Title;
