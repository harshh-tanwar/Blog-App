import * as type from "../types";

const initailPostsState: type.initialPosts = {
  posts: [],
  loading: false,
  error: null,
};
export function posts(state = initailPostsState, action: any) {
  switch (action.type) {
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
    default:
      return state;
  }
}

const initailPostState: type.initialPost = {
  post: {},
  loading: false,
  error: null,
};
export function post(state = initailPostState, action: any) {
  switch (action.type) {
    case type.GET_POST_REQUESTED:
      console.log("oof");
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
    case type.DELETE_POST_REQUIRED:
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
    default:
      return state;
  }
}

export function createPost(state = initailPostState, action: any) {
  switch (action.type) {
    case type.CREATE_POST_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case type.CREATE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        post: action.post,
      };
    case type.CREATE_POST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message,
      };
    default:
      return state;
  }
}

const initailUserPostsState: type.initialUserPosts = {
  userposts: [],
  loading: false,
  error: null,
};
export function userPosts(state = initailUserPostsState, action: any) {
  switch (action.type) {
    case type.GET_USER_POST_REQUIRED:
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
    default:
      return state;
  }
}
