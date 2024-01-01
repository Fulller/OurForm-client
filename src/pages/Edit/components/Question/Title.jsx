import { useDispatch } from "react-redux";
import QuestionService from "../../../../services/question.service";
import useDebouncedApiCall from "../../../../hooks/useDebouncedApiCall";
import editFormSlide from "../../../../redux/slides/edit_form.slide";
import TextEditor from "../TextEditor";

function Title({ question }) {
  const dispatch = useDispatch();
  const { _id, title } = question;
  const debouncedUpdate = useDebouncedApiCall(QuestionService.update, 500);
  async function handleTextChange(value) {
    dispatch(
      editFormSlide.actions.updateQuestion({
        _id,
        key: "title",
        value,
      })
    );
    await debouncedUpdate(_id, {
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
    </div>
  );
}
export default Title;
