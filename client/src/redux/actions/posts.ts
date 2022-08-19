import * as type from "../types";

export function getPosts(posts?: any) {
  return {
    type: type.GET_POSTS_REQUESTED,
    payload: posts,
  };
}
export function getPost(id: string) {
  console.log("Action")
  return {
    type: type.GET_POST_REQUESTED,
    payload: id,
  };
}
export function createPost(postData: any) {
  return {
    type: type.CREATE_POST_REQUESTED,
    payload: postData,
  };
}
export function userPosts(id: string) {
  return {
    type: type.GET_USER_POST_REQUIRED,
    payload: id,
  };
}
