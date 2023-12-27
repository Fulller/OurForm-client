import { Radio } from "antd";
import { useSelector } from "react-redux";
import editFormSelector from "../../../redux/selectors/edit_form.selector";

function MultipleChoice({ questionId, has_answer }) {
  const multipleChoice = useSelector(editFormSelector.data(questionId));
  const { answer_data, question_data } = multipleChoice;
  return (
    <div className="question-content multiple-choice">
      <Radio.Group value={answer_data} size="large">
        {question_data.map((option) => {
          const optionId = option._id;
          const showAnswer = has_answer && answer_data === optionId;
          return (
            <div className="multiple-choice-option" key={optionId}>
              <Radio disabled={!has_answer}>
                <span className="option-text">{option.text}</span>
                {showAnswer && (
                  <span className="option-checked-icon">
                    <i className="fa-solid fa-check"></i>
                  </span>
                )}
              </Radio>
            </div>
          );
        })}
      </Radio.Group>
    </div>
  );
}
export default MultipleChoice;
