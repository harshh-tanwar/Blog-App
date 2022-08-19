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

export const GET_USER_POST_REQUIRED = "GET_USER_POST_REQUIRED";
export const GET_USER_POST_SUCCESS = "GET_USER_POST_SUCCESS";
export const GET_USER_POST_FAILED = "GET_USER_POST_FAILED";

export interface initialPosts {
  posts: any;
  loading: boolean;
  error: null;
}
export interface initialPost {
  post: any;
  loading: boolean;
  error: null;
}
export interface initialUser {
  user: any;
  error: null;
}
export interface initialUserPosts {
  userposts: any;
  loading: boolean;
  error: null;
}
