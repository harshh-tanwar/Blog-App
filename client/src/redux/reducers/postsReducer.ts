import * as type from "../types";

const initailPostsState: type.initialPosts = {
  posts: [],
  post: {},
  userPosts: [],
  loading: false,
  error: null,
};
export function posts(state = initailPostsState, action: any) {
  switch (action.type) {
    //all posts
    case type.GET_POSTS_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case type.GET_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.posts,
      };
    case type.GET_POSTS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message,
      };
      //single post
    case type.GET_POST_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case type.GET_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        post: action.post,
      };
    case type.GET_POST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message,
      };
      //delete post
    case type.DELETE_POST_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case type.DELETE_POST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message,
      };
      //create post
    case type.CREATE_POST_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case type.CREATE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case type.CREATE_POST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message,
      };
      //user posts
    case type.GET_USER_POST_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case type.GET_USER_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        userposts: action.userposts,
      };
    case type.GET_USER_POST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message,
      };
      //update post
    case type.UPDATE_POST_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case type.UPDATE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case type.UPDATE_POST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message,
      };
    default:
      return state;
  }
}
