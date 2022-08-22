import { combineReducers } from "redux";
import { posts } from "./postsReducer";
import { user } from "./userReducer";

const rootReducer = combineReducers({
  posts: posts,
  user: user,
});

export default rootReducer;
