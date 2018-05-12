import { _getQuestions, _saveQuestion } from "../utils/_DATA";
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
    return _getQuestions().then(response =>
      dispatch(receiveQuestions(response))
    );
  };
};

export const createQuestion = question => {
  return dispatch => {
    return _saveQuestion(question).then(response => {
      dispatch(newQuestion(response));
    });
  };
};
