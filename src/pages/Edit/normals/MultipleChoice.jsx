import { Radio } from "antd";
import ".scss";

function MultipleChoice({ question }) {
  const { has_answer, data, type } = question;
  const { answer_data, question_data } = data[type];
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
