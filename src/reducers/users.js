import { RECEIVE_USERS, SAVE_ANSWER } from "../actions/users";

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      };
    case SAVE_ANSWER:
      const user = state[action.savedAnswer.authedUser];
      let ans = user.answers;
      let key = action.savedAnswer.qid;
      let val = action.savedAnswer.answer;
      ans[key] = val;
      return {
        ...state,
        [action.savedAnswer.authedUser]: {
          ...user,
          answers: ans
        }
      };
    default:
      return state;
  }
}
