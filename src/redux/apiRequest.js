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
  findUserStart,
  findUserSuccess,
  findUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  changePasswordStart,
  changePasswordSuccess,
  changePasswordFailure,
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
import {
  createHistoryFailure,
  createHistoryStart,
  createHistorySuccess,
  getHighestFailure,
  getHighestStart,
  getHighestSuccess,
  getHistoryFailure,
  getHistoryStart,
  getHistorySuccess,
  getRankOfATestFailure,
  getRankOfATestStart,
  getRankOfATestSuccess,
} from "./historySlice";

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

// Start user
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
    return false;
  }
};

export const signup = async (user, dispatch, navigate) => {
  dispatch(userSignupStart());
  try {
    const res = await axios.post(`${REACT_APP_BASE_URL}user/signup`, user);
    const refreshToken = res.data?.metadata?.metadata?.tokens?.refreshToken;
    localStorage.setItem("refreshToken", refreshToken);
    dispatch(userSignupSuccess());
    navigate("/signin");
  } catch (error) {
    dispatch(userSignupFailure());
    return false;
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
      {},
      {
        headers: {
          authorization: accessToken,
          user: userID,
        },
      }
    );
    dispatch(userLogoutSuccess());
    navigate("/signin");
  } catch (error) {
    dispatch(userLogoutFailure());
  }
};

export const updateUser = async (
  accessToken,
  userID,
  data,
  dispatch,
  axiosJWT
) => {
  dispatch(updateUserStart());
  try {
    const result = await axiosJWT.post(
      `${REACT_APP_BASE_URL}user/update`,
      data,
      {
        headers: {
          authorization: accessToken,
          user: userID,
        },
      }
    );
    dispatch(updateUserSuccess());
    return result;
  } catch (error) {
    dispatch(updateUserFailure());
  }
};

export const changePassword = async (
  accessToken,
  userID,
  data,
  dispatch,
  axiosJWT
) => {
  dispatch(changePasswordStart());
  try {
    const res = await axiosJWT.post(
      `${REACT_APP_BASE_URL}user/change-password`,
      data,
      {
        headers: {
          authorization: accessToken,
          user: userID,
        },
      }
    );
    dispatch(changePasswordSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(changePasswordFailure());
  }
};

export const findUser = async (userID, dispatch) => {
  dispatch(findUserStart());
  try {
    const res = await axios.get(`${REACT_APP_BASE_URL}user/find/${userID}`);
    dispatch(findUserSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(findUserFailure());
  }
};

// End user

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
    navigate("/answers");
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

export const deleteAnswer = async (accessToken, ID, dispatch, axiosJWT) => {
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
  } catch (error) {
    dispatch(deleteAnswerFailure());
  }
};

// End answer

// Start history and ranking

export const createHistory = async (accessToken, data, dispatch, axiosJWT) => {
  dispatch(createHistoryStart());
  try {
    const res = await axiosJWT.post(`${REACT_APP_BASE_URL}history`, data, {
      headers: {
        "Content-Type": "application/json",
        authorization: `${accessToken}`,
      },
    });
    dispatch(createHistorySuccess(res.data));
  } catch (error) {
    dispatch(createHistoryFailure());
  }
};

export const getHistoryOfUser = async (userID, dispatch) => {
  dispatch(getHistoryStart());
  try {
    const res = await axios.get(
      `${REACT_APP_BASE_URL}history/get-of-user/${userID}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(getHistorySuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(getHistoryFailure());
  }
};

export const getHighestOfUser = async (userID, dispatch) => {
  dispatch(getHighestStart());
  try {
    const res = await axios.get(
      `${REACT_APP_BASE_URL}history/highest/${userID}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(getHighestSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(getHighestFailure());
  }
};

export const getRankingListOfATest = async (answerID, dispatch) => {
  dispatch(getRankOfATestStart());
  try {
    const res = await axios.get(
      `${REACT_APP_BASE_URL}history/find-top-single/${answerID}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(getRankOfATestSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(getRankOfATestFailure());
  }
};

// End history and ranking
