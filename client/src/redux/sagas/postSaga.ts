import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import config from "../../config/config";

const apiUrl = `${config.server}/api`;

/* get all posts */
const getPosts = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.get(`${apiUrl}/posts`, {
      headers: {
        "x-auth-token": token,
      },
    });
    return res.data.data;
  } catch (error) {
    return error;
  }
};
// @ts-ignore
function* fetchPosts(action) {
  try {
    //@ts-ignore
    const posts = yield call(getPosts);
    yield put({ type: "GET_POSTS_SUCCESS", posts: posts });
  } catch (error) {
    yield put({ type: "GET_POSTS_FAILED", message: error });
  }
}

/* get one post */
const getPost = async (id: string) => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.get(`${config.server}/api/post/${id}`, {
      headers: {
        "x-auth-token": token,
      },
    });
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    return error;
  }
};
// @ts-ignore
function* fetchPost(action) {
  try {
    //@ts-ignore
    const post = yield call(getPost, action.payload);
    yield put({ type: "GET_POST_SUCCESS", post: post });
  } catch (error) {
    yield put({ type: "GET_POST_FAILED", message: error });
  }
}

/* create post */
const makePost = async (postData: any) => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.post(`${config.server}/api/create`, postData, {
      headers: {
        "x-auth-token": token,
      },
    });
    return res.data.data;
  } catch (error) {
    return error;
  }
};
// @ts-ignore
function* createPost(action) {
  try {
    //@ts-ignore
    const post = yield call(makePost, action.payload);
    yield put({ type: "CREATE_POST_SUCCESS", post: post });
  } catch (error) {
    yield put({ type: "CREATE_POST_FAILED", message: error });
  }
}

/* get user posts */
const fetchUserPosts = async (id: string) => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.get(`${config.server}/api/posts?userId=${id}`, {
      headers: {
        "x-auth-token": token,
      },
    });
    return res.data.data;
  } catch (error) {
    return error;
  }
};
// @ts-ignore
function* userPosts(action) {
  try {
    //@ts-ignore
    const userposts = yield call(fetchUserPosts, action.payload);
    yield put({ type: "GET_USER_POST_SUCCESS", userposts: userposts });
  } catch (error) {
    yield put({ type: "GET_USER_POST_FAILED", message: error });
  }
}
/* delete post */
const delPost = async (id: string) => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.delete(`${config.server}/api/delete/${id}`, {
      headers: {
        "x-auth-token": token,
      },
    });
    return res.data.data;
  } catch (error) {
    return error;
  }
};
// @ts-ignore
function* deletePost(action) {
  try {
    //@ts-ignore
    const deletedPost = yield call(delPost, action.payload);
    yield put({ type: "DELETE_POST_SUCCESS", post: deletedPost });
  } catch (error) {
    yield put({ type: "DELETE_POST_FAILED", message: error });
  }
}

function* postSaga() {
  yield takeEvery("GET_POSTS_REQUESTED", fetchPosts);
  yield takeEvery("GET_POST_REQUESTED", fetchPost);
  yield takeEvery("CREATE_POST_REQUESTED", createPost);
  yield takeEvery("GET_USER_POST_REQUIRED", userPosts);
  yield takeEvery("DELETE_POST_REQUIRED", deletePost);
}

export default postSaga;
