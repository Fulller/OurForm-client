import Option from "../components/Option";
import { Radio } from "antd";
import MultipleChoiceServices from "../../../services/multiple_choice.service";
import { useSelector, useDispatch } from "react-redux";
import editFormSelector from "../../../redux/selectors/edit_form.selector";
import editFormSlide from "../../../redux/slides/edit_form.slide";

function MultipleChoice({ questionId, has_answer }) {
  const dispatch = useDispatch();
  const multipleChoice = useSelector(editFormSelector.data(questionId));
  const { _id, answer_data, question_data } = multipleChoice;
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
              <Option questionId={questionId} optionId={optionId}></Option>
              <button
                className="delete-btn"
                onClick={(e) => handleDeleteOption(option._id)}
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
