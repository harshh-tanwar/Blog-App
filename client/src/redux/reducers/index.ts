import { combineReducers } from "redux";
import { posts, post, createPost, userPosts } from "./postsReducer";
import { user } from "./userReducer";

const rootReducer = combineReducers({
  posts: posts,
  post: post,
  createPost: createPost,
  userPosts: userPosts,
  user: user,
});

export default rootReducer;
