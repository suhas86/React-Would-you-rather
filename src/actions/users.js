import { _getUsers,_saveQuestionAnswer } from "../utils/_DATA";
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
    return _getUsers().then(response => dispatch(receiveusers(response)));
  };
};


export const saveQuestionAnswer = request => {
  return dispatch => {
    return _saveQuestionAnswer(request).then(response => {
      dispatch(saveAnswer(request));
    });
  };
};
