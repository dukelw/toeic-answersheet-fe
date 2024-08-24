import axios from "axios";

import {
  userSigninStart,
  userSigninSuccess,
  userSigninFailure,
  userSignupStart,
  userSignupSuccess,
  userSignupFailure,
  userLogoutStart,
  userLogoutSuccess,
  userLogoutFailure,
} from "./userSlice";
import {
  uploadAudioFailure,
  uploadAudioStart,
  uploadAudioSuccess,
  uploadImageFailure,
  uploadImageStart,
  uploadImageSuccess,
} from "./uploadSlice";
import {
  createAnswerStart,
  createAnswerSuccess,
  createAnswerFailure,
  updateAnswerStart,
  updateAnswerSuccess,
  updateAnswerFailure,
  deleteAnswerStart,
  deleteAnswerSuccess,
  deleteAnswerFailure,
  getAnswerStart,
  getAnswerSuccess,
  getAnswerFailure,
  getAllAnswersStart,
  getAllAnswersSuccess,
  getAllAnswersFailure,
} from "./answerSlice";

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

// User
export const signin = async (user, dispatch, navigate) => {
  dispatch(userSigninStart());
  try {
    const res = await axios.post(`${REACT_APP_BASE_URL}user/signin`, user);
    const refreshToken = res.data.metadata.tokens.refreshToken;
    localStorage.setItem("refreshToken", refreshToken);
    dispatch(userSigninSuccess(res.data));
    navigate("/");
  } catch (error) {
    dispatch(userSigninFailure());
  }
};

export const signup = async (user, dispatch, navigate) => {
  dispatch(userSignupStart());
  try {
    const res = await axios.post(`${REACT_APP_BASE_URL}user/signup`, user);
    const refreshToken = res.data?.metadata?.metadata?.tokens?.refreshToken;
    localStorage.setItem("refreshToken", refreshToken);
    dispatch(userSignupSuccess());
    navigate("/");
  } catch (error) {
    dispatch(userSignupFailure());
  }
};

export const logout = async (
  accessToken,
  userID,
  dispatch,
  navigate,
  axiosJWT
) => {
  dispatch(userLogoutStart());
  try {
    await axiosJWT.post(
      `${REACT_APP_BASE_URL}user/logout`,
      {}, // Dữ liệu gửi đi rỗng trong trường hợp này
      {
        headers: {
          authorization: accessToken,
          user: userID,
        },
      }
    );
    dispatch(userLogoutSuccess());
    navigate("signin");
  } catch (error) {
    dispatch(userLogoutFailure());
  }
};

// Upload
export const uploadImage = async (file, folderName, dispatch) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folderName", folderName);
  dispatch(uploadImageStart());
  try {
    const res = await axios.post(
      `${REACT_APP_BASE_URL}upload/answer-image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    dispatch(uploadImageSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(uploadImageFailure());
  }
};

export const uploadAudio = async (audio, dispatch) => {
  const formData = new FormData();
  formData.append("audio", audio);
  dispatch(uploadAudioStart());
  try {
    const res = await axios.post(
      `${REACT_APP_BASE_URL}upload/answer-audio`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    dispatch(uploadAudioSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(uploadAudioFailure());
  }
};

// End upload

// Start answer

export const getAnswer = async (ID, dispatch) => {
  dispatch(getAnswerStart());
  try {
    const res = await axios.get(`${REACT_APP_BASE_URL}answer/find/${ID}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch(getAnswerSuccess(res.data));
    return res.data;
  } catch (error) {
    console.error("Error fetching answer:", error);
    dispatch(getAnswerFailure());
  }
};

export const getAllAnswers = async (dispatch) => {
  dispatch(getAllAnswersStart());
  try {
    const res = await axios.get(`${REACT_APP_BASE_URL}answer`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch(getAllAnswersSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(getAllAnswersFailure());
  }
};

export const createAnswer = async (
  accessToken,
  answer,
  dispatch,
  navigate,
  axiosJWT
) => {
  dispatch(createAnswerStart());
  try {
    const res = await axiosJWT.post(
      `${REACT_APP_BASE_URL}answer/create`,
      answer,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `${accessToken}`,
        },
      }
    );
    dispatch(createAnswerSuccess(res.data));
    navigate("/");
  } catch (error) {
    dispatch(createAnswerFailure());
  }
};

export const updateAnswer = async (
  accessToken,
  answer,
  dispatch,
  navigate,
  axiosJWT
) => {
  dispatch(updateAnswerStart());
  try {
    const res = await axiosJWT.post(
      `${REACT_APP_BASE_URL}answer/update`,
      answer,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `${accessToken}`,
        },
      }
    );
    dispatch(updateAnswerSuccess(res.data));
    navigate("/");
  } catch (error) {
    dispatch(updateAnswerFailure());
  }
};

export const deleteAnswer = async (
  accessToken,
  ID,
  dispatch,
  navigate,
  axiosJWT
) => {
  dispatch(deleteAnswerStart());
  try {
    await axiosJWT.delete(
      `${REACT_APP_BASE_URL}answer/${ID}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `${accessToken}`,
        },
      }
    );
    dispatch(deleteAnswerSuccess());
    navigate("/");
  } catch (error) {
    dispatch(deleteAnswerFailure());
  }
};

// End answer
