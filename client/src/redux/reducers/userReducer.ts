import * as type from "../types";

const initailUserState: type.initialUser = {
  user: {},
  error: null,
};
export function user(state = initailUserState, action: any) {
  switch (action.type) {
    case type.GET_USER_REQUESTED:
      return {
        ...state,
      };
    case type.GET_USER_SUCCESS:
      return {
        ...state,
        user: action.user,
      };
    case type.GET_USER_FAILED:
      return {
        ...state,
        error: action.message,
      };
    case type.REMOVE_USER:
      return {
        ...state,
        user: {},
      };
    default:
      return state;
  }
}
