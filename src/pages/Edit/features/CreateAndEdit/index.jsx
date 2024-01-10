import _ from "lodash";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import editFormSelector from "~/redux/selectors/edit_form.selector";
import editFormSlide from "~/redux/slides/edit_form.slide";
import behaviorSelector from "~/redux/selectors/behavior.selector";
import { useState } from "react";
import Header from "./components/Header";
import AddButton from "./components/AddButton";
import Question from "./components/Question";
import FormService from "~/services/form.service";
import ".scss";

function CreateAndEdit() {
  const dispatch = useDispatch();
  const form = useSelector(editFormSelector.get());
  const formId = _.get(form, "_id", null);
  const questions = _.get(form, "questions", []);
  const questionLength = questions.length;
  const setting = _.get(form, "setting", null);
  const has_index = _.get(setting, "has_index", true);
  const [dragging, setDragging] = useState(false);

  const questionFocusedId = useSelector(
    behaviorSelector.edit_questionFocusedId
  );

  async function handleDrapEnd(result) {
    if (!result.destination) {
      return;
    }
    const newItems = _.clone(questions);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
    dispatch(
      editFormSlide.actions.updateQuestionOrder({ questions: newItems })
    );
    setDragging(false);
    await FormService.updateIndeQuestions(formId, _.map(newItems, "_id"));
  }
  if (!form) return <></>;
  return (
    <div id="create-and-edit-feature">
      <Header setting={setting}></Header>
      <DragDropContext
        onDragEnd={handleDrapEnd}
        onDragStart={() => {
          setDragging(true);
        }}
      >
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
                  isDragDisabled={questionFocusedId != null}
                >
                  {(provided, snapshot) => (
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
                        question={question}
                        index={index}
                        dragging={dragging}
                        snapshot={snapshot}
                        has_index={has_index}
                        questionLength={questionLength}
                      ></Question>
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
export default CreateAndEdit;
