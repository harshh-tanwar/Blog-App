import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import config from "../../config/config";

const apiUrl = `${config.server}/api`;

/* get one user */
const getUser = async (userData: any) => {
  try {
    const userDetails = await axios.post(`${apiUrl}/users`, userData);
    localStorage.setItem("token", JSON.stringify(userDetails.data.token));
    return userDetails.data;
  } catch (error) {
    return error;
  }
};

// @ts-ignore
function* fetchUser(action) {
  try {
    //@ts-ignore
    const user = yield call(getUser, action.payload);
    yield put({ type: "GET_USER_SUCCESS", user: user });
  } catch (error) {
    yield put({ type: "GET_USER_FAILED", message: error });
  }
}

function* userSaga() {
  yield takeEvery("GET_USER_REQUESTED", fetchUser);
}

export default userSaga;
