import { _getQuestions, _saveQuestion } from "../utils/_DATA";
import { showLoading, hideLoading } from "react-redux-loading";
export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const CREATE_QUESTION = "CREATE_QUESTION";

function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  };
}
function newQuestion(question) {
  return {
    type: CREATE_QUESTION,
    question
  };
}
export const getQuestions = () => {
  return dispatch => {
    dispatch(showLoading());
    return _getQuestions().then(response => {
      dispatch(receiveQuestions(response));
      dispatch(hideLoading());
    });
  };
};

export const createQuestion = question => {
  return dispatch => {
    dispatch(showLoading());
    return _saveQuestion(question).then(response => {
      dispatch(newQuestion(response));
      dispatch(hideLoading());
    });
  };
};
