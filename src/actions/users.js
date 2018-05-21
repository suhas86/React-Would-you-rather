import { _getUsers, _saveQuestionAnswer } from "../utils/_DATA";
import { getQuestions } from "./questions";
import { showLoading, hideLoading } from "react-redux-loading";
export const RECEIVE_USERS = "RECEIVE_USERS";
export const SAVE_ANSWER = "SAVE_ANSWER";

function receiveusers(users) {
  return {
    type: RECEIVE_USERS,
    users
  };
}

function saveAnswer(savedAnswer) {
  return {
    type: SAVE_ANSWER,
    savedAnswer
  };
}

export const getUsers = () => {
  return dispatch => {
    dispatch(showLoading());
    return _getUsers().then(response => {
      dispatch(receiveusers(response));
      dispatch(hideLoading());
    });
  };
};

export const saveQuestionAnswer = request => {
  return dispatch => {
    dispatch(showLoading());
    return _saveQuestionAnswer(request).then(response => {
      dispatch(saveAnswer(request));
      dispatch(getQuestions());
      dispatch(hideLoading());
    });
  };
};
