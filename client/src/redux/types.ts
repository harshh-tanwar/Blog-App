export const GET_POSTS_REQUESTED = "GET_POSTS_REQUESTED";
export const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS";
export const GET_POSTS_FAILED = "GET_POSTS_FAILED";

export const GET_POST_REQUESTED = "GET_POST_REQUESTED";
export const GET_POST_SUCCESS = "GET_POST_SUCCESS";
export const GET_POST_FAILED = "GET_POST_FAILED";

export const GET_USER_REQUESTED = "GET_USER_REQUESTED";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILED = "GET_USER_FAILED";
export const REMOVE_USER = "REMOVE_USER";

export const CREATE_POST_REQUESTED = "CREATE_POST_REQUESTED";
export const CREATE_POST_SUCCESS = "CREATE_POST_SUCCESS";
export const CREATE_POST_FAILED = "CREATE_POST_FAILED";

export const GET_USER_POST_REQUESTED = "GET_USER_POST_REQUIRED";
export const GET_USER_POST_SUCCESS = "GET_USER_POST_SUCCESS";
export const GET_USER_POST_FAILED = "GET_USER_POST_FAILED";

export const DELETE_POST_REQUESTED = "DELETE_POST_REQUIRED";
export const DELETE_POST_SUCCESS = "DELETE_POST_SUCCESS";
export const DELETE_POST_FAILED = "DELETE_POST_FAILED";

export const UPDATE_POST_REQUESTED = "UPDATE_POST_REQUIRED";
export const UPDATE_POST_SUCCESS = "UPDATE_POST_SUCCESS";
export const UPDATE_POST_FAILED = "UPDATE_POST_FAILED";

export interface initialPosts {
  posts: any;
  post: any;
  userPosts: any;
  loading: boolean;
  error: null;
}
export interface initialUser {
  user: any;
  error: null;
}
