import _ from "lodash";
import Header from "./components/Header";
import AddButton from "./components/AddButton";
import Question from "./components/Question";
import FormService from "../../services/form.service";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import editFormSelector from "../../redux/selectors/edit_form.selector";
import editFormSlide from "../../redux/slides/edit_form.slide";
import behaviorSelector from "../../redux/selectors/behavior.selector";
import "./Edit.scss";

function Edit() {
  const dispatch = useDispatch();
  const form = useSelector(editFormSelector.get());
  const formId = _.get(form, "_id", null);
  const questions = _.get(form, "questions", []);
  const questionFocusedId = useSelector(
    behaviorSelector.edit_questionFocusedId
  );
  const onDragEnd = async (result) => {
    if (!result.destination) {
      return;
    }
    const newItems = _.clone(questions);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
    dispatch(
      editFormSlide.actions.updateQuestionOrder({ questions: newItems })
    );
    await FormService.updateIndeQuestions(formId, _.map(newItems, "_id"));
  };
  if (!form) return <></>;
  return (
    <div id="edit-page">
      <Header></Header>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div
              style={{ width: "100%" }}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {questions.map((question, index) => (
                <Draggable
                  key={question._id}
                  draggableId={question._id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        width: "100%",
                        ...provided.draggableProps.style,
                      }}
                    >
                      <Question
                        formId={formId}
                        _id={question._id}
                        index={index}
                      >
                        <AddButton index={index}></AddButton>
                      </Question>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {questionFocusedId == null && (
        <AddButton index={questions.length}></AddButton>
      )}
    </div>
  );
}
export default Edit;
