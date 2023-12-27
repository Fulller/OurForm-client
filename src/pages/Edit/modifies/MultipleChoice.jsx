import Option from "../components/Option";
import { Radio } from "antd";
import MultipleChoiceServices from "../../../services/multiple_choice.service";
import { useDispatch } from "react-redux";
import editFormSlide from "../../../redux/slides/edit_form.slide";

function MultipleChoice({ question }) {
  const dispatch = useDispatch();
  const { _id: questionId, has_answer, data, type } = question;
  const { _id, answer_data, question_data } = data[type];
  const handleChooseAnswer = async (e) => {
    const optionId = e.target.value;
    const isSuccess = await MultipleChoiceServices.updateAnswerData({
      _id,
      answer_data: optionId,
    });
    isSuccess &&
      dispatch(
        editFormSlide.actions.multiple_choice({
          questionId,
          action: {
            type: "answer_data",
            payload: {
              _id: optionId,
            },
          },
        })
      );
  };
  const handleDeleteOption = async (optionId) => {
    const isSuccess = await MultipleChoiceServices.deleteQuestionData({
      _id,
      optionId,
    });
    isSuccess &&
      dispatch(
        editFormSlide.actions.multiple_choice({
          questionId,
          action: {
            type: "question_data/delete",
            payload: {
              _id: optionId,
            },
          },
        })
      );
  };
  const handlAddOption = async () => {
    const option = await MultipleChoiceServices.addQuestionData({ _id });
    option &&
      dispatch(
        editFormSlide.actions.multiple_choice({
          questionId,
          action: {
            type: "question_data/add",
            payload: {
              option,
            },
          },
        })
      );
  };
  return (
    <div className="question-content multiple-choice ">
      <Radio.Group onChange={handleChooseAnswer} value={answer_data}>
        {question_data.map((option) => {
          const optionId = option._id;
          return (
            <div className="multiple-choice-option" key={optionId}>
              <Radio value={optionId} disabled={!has_answer}></Radio>
              <Option questionId={questionId} option={option}></Option>
              <button
                className="delete-btn"
                onClick={() => handleDeleteOption(option._id)}
              >
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          );
        })}
      </Radio.Group>
      <button className="button no-bg add-option-btn" onClick={handlAddOption}>
        <span className="material-symbols-outlined icon">add</span>
        <span className="label">Add option</span>
      </button>
    </div>
  );
}
export default MultipleChoice;
