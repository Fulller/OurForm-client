import { useEffect, useRef } from "react";
import { Switch } from "antd";
import Title from "./Title";
import Image from "./Image";
import { questionTypesObj } from "../../../constans/questiontype.const";
import useFocus from "../../../hooks/useFocus";
import _ from "lodash";
import QuestionService from "../../../services/question.service";
import FormService from "../../../services/form.service";
import useDebouncedApiCall from "../../../hooks/useDebouncedApiCall";
import { useSelector, useDispatch } from "react-redux";
import editFormSlide from "../../../redux/slides/edit_form.slide";
import behaviorSlide from "../../../redux/slides/behavior.slide";
import behaviorSelector from "../../../redux/selectors/behavior.selector";

function Question({ formId, index, children, question }) {
  const dispatch = useDispatch();
  const {
    _id,
    type,
    title = "Question",
    image,
    required,
    score,
    has_answer = false,
  } = question;
  const isCurrentQuestionFocus =
    useSelector(behaviorSelector.edit_questionFocusedId) === _id;
  const ref = useRef(null);
  const [isFocus] = useFocus(ref, isCurrentQuestionFocus);
  const Modify = questionTypesObj[type].modify;
  const Normal = questionTypesObj[type].normal;
  const debouncedUpdate = useDebouncedApiCall(QuestionService.update);
  async function handleUpdate({ key, value }) {
    dispatch(editFormSlide.actions.updateQuestion({ _id, key, value }));
    await debouncedUpdate(_id, {
      key: key,
      value: value,
    });
  }
  async function handleDelete() {
    dispatch(editFormSlide.actions.deleteQuestion({ _id }));
    await FormService.deleteQuestion({ _id: formId, questionId: _id });
  }
  useEffect(() => {
    dispatch(
      behaviorSlide.actions.set_edit_questionFocusedId({
        _id: isFocus ? _id : null,
      })
    );
  }, [isFocus, index, _id, dispatch]);
  return (
    <div className="question" ref={ref}>
      {!isFocus && (
        <div className="question-normal">
          <div className="question-header">
            <span className="index">{index + 1}</span>
            <div className="question-header-top">
              <h5 className="title">{title}</h5>
              {(required || has_answer) && (
                <div className="option">
                  <span className={required ? "required" : "hidden"}>
                    <i className="fa-solid fa-star-of-life"></i> (required)
                  </span>
                  <span className={has_answer ? "score" : "hidden"}>
                    ({score} scores)
                  </span>
                </div>
              )}
            </div>
          </div>
          <Normal questionId={_id} has_answer={has_answer}></Normal>
        </div>
      )}
      {isFocus && (
        <div className="question-modify">
          <div className="question-top">
            <span className="index">{index + 1}</span>
            <div className="action">
              <button className="top-button">
                <span className="material-symbols-outlined">content_copy</span>
              </button>
              <button className="top-button" onClick={handleDelete}>
                <span className="material-symbols-outlined">delete</span>
              </button>
              <button className="top-button disable">
                <span className="material-symbols-outlined">arrow_upward</span>
              </button>
              <button className="top-button">
                <span className="material-symbols-outlined">
                  arrow_downward
                </span>
              </button>
            </div>
          </div>
          <div className="question-header">
            <Title questionId={_id}></Title>
            <Image src={image} className="question-header-image"></Image>
          </div>
          <Modify question={question}></Modify>
          <div className="question-footer">
            <div className="question-footer-item">
              <span className="label">Has answer:</span>
              <Switch
                defaultChecked={has_answer}
                value={has_answer}
                onChange={(value) => {
                  handleUpdate({ key: "has_answer", value });
                }}
                size="100"
              />
            </div>
            <label>
              <div
                className={`question-footer-item ${
                  !has_answer ? "disable" : ""
                }`}
              >
                <span className="label">Score:</span>
                <input
                  type="number"
                  max={100}
                  min={0}
                  maxLength={3}
                  defaultValue={score}
                  onChange={({ target: { value } }) =>
                    handleUpdate({ key: "score", value: _.toNumber(value) })
                  }
                  disabled={!has_answer}
                />
              </div>
            </label>
            <div className="question-footer-item">
              <span className="label">Require:</span>
              <Switch
                defaultChecked={required}
                value={required}
                onChange={(value) => handleUpdate({ key: "required", value })}
              />
            </div>
          </div>
        </div>
      )}
      {isFocus && children}
    </div>
  );
}
export default Question;
