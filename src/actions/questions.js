import { _getQuestions } from "../utils/_DATA";
export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";

function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  };
}
export const getQuestions = () => {
  return dispatch => {
    return _getQuestions().then(response =>
      dispatch(receiveQuestions(response))
    );
  };
};

