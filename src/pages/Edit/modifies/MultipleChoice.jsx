import { useDispatch } from "react-redux";
import editFormSlide from "../../../redux/slides/edit_form.slide";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Radio } from "antd";
import Option from "../components/Option";
import MultipleChoiceServices from "../../../services/multiple_choice.service";
import _ from "lodash";
import ".scss";

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
  const handleOrtherQuestionData = async (question_data_clone) => {
    dispatch(
      editFormSlide.actions.multiple_choice({
        questionId,
        action: {
          type: "question_data/orther",
          payload: {
            question_data: question_data_clone,
          },
        },
      })
    );
    await MultipleChoiceServices.ortherQuestionData({
      _id,
      question_data: _.map(question_data_clone, "_id"),
    });
  };
  async function handleDrapEnd(result) {
    if (!result.destination) {
      return;
    }
    const question_data_clone = _.clone(question_data);
    const [reorderedItem] = question_data_clone.splice(result.source.index, 1);
    question_data_clone.splice(result.destination.index, 0, reorderedItem);
    handleOrtherQuestionData(question_data_clone);
  }
  return (
    <div className="question-content multiple-choice">
      <Radio.Group
        onChange={handleChooseAnswer}
        value={has_answer ? answer_data : null}
      >
        <DragDropContext onDragEnd={handleDrapEnd}>
          <Droppable droppableId="droppable-option">
            {(provided) => (
              <div
                style={{ width: "100%" }}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {question_data.map((option, index) => {
                  const optionId = option._id;
                  return (
                    <Draggable
                      key={optionId + "draggable"}
                      draggableId={optionId + "draggable"}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          style={{
                            width: "100%",
                            ...provided.draggableProps.style,
                          }}
                        >
                          <div
                            className={
                              "multiple-choice-option " +
                              (snapshot.isDragging && "isDragging")
                            }
                          >
                            <span
                              className="material-symbols-outlined drap-button"
                              ref={provided.innerRef}
                              {...provided.dragHandleProps}
                            >
                              drag_indicator
                            </span>
                            <Radio
                              value={optionId}
                              disabled={!has_answer}
                              className="radio-btn"
                            ></Radio>
                            <Option
                              questionId={questionId}
                              option={option}
                              className="text"
                            ></Option>
                            <button
                              className="delete-btn"
                              onClick={() => handleDeleteOption(optionId)}
                            >
                              <span className="material-symbols-outlined">
                                delete
                              </span>
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Radio.Group>
      <button className="button no-bg add-option-btn" onClick={handlAddOption}>
        <span className="material-symbols-outlined icon">add</span>
        <span className="label">Add option</span>
      </button>
    </div>
  );
}
export default MultipleChoice;
