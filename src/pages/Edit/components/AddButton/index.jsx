import { useState } from "react";
import { questionTypes } from "~/constans/questiontype.const";
import FormService from "~/services/form.service";
import { useDispatch, useSelector } from "react-redux";
import editFormSlide from "~/redux/slides/edit_form.slide";
import editFormSelector from "~/redux/selectors/edit_form.selector";
import behaviorSlide from "~/redux/slides/behavior.slide";
import ".scss";

function AddButton({ index }) {
  const dispatch = useDispatch();
  const formId = useSelector(editFormSelector.get("_id"));
  const [actived, setActived] = useState(false);
  async function handleClickQuestionType(name) {
    const question = await FormService.addQuestion(formId, name, index);
    const execIndex = index + 1;
    if (question) {
      dispatch(
        editFormSlide.actions.addQuestion({ question, index: execIndex })
      );
      dispatch(
        behaviorSlide.actions.set_edit_questionFocusedId({ _id: question._id })
      );
    }
    setActived(false);
  }
  return (
    <div className="container-add-button">
      <button
        className={`button ${actived ? "actived" : ""}`}
        onClick={() => setActived(!actived)}
      >
        <span className="material-symbols-outlined">add</span>
        {!actived && <span className="label">Add new</span>}
      </button>
      {actived && (
        <div className="question-types">
          {questionTypes.map(({ name, label, icon }) => {
            return (
              <button
                key={name}
                className="question-type"
                onClick={() => handleClickQuestionType(name)}
              >
                {icon}
                <span className="label">{label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
export default AddButton;
