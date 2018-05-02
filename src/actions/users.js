import { _getUsers } from "../utils/_DATA";
export const RECEIVE_USERS = "RECEIVE_USERS";

function receiveusers(users) {
  return {
    type: RECEIVE_USERS,
    users
  };
}

export const getUsers = () => {
  return dispatch => {
    return _getUsers().then(response => dispatch(receiveusers(response)));
  };
};
