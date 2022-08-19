import * as type from "../types";

export function getUser(userData: any) {
  return {
    type: type.GET_USER_REQUESTED,
    payload: userData,
  };
}
export function removeUser(userData?: any) {
  return {
    type: type.REMOVE_USER,
    payload: userData,
  };
}
