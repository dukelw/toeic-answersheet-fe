import { createSlice } from "@reduxjs/toolkit";

const answerSlide = createSlice({
  name: "answer",
  initialState: {
    get: {
      answer: null,
      isFetching: false,
      error: false,
    },
    getAll: {
      answers: null,
      isFetching: false,
      error: false,
    },
    create: {
      createdAnswer: null,
      isFetching: false,
      error: false,
    },
    update: {
      updatedAnswer: null,
      isFetching: false,
      error: false,
    },
    delete: {
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    getAnswerStart: (state) => {
      state.get.isFetching = true;
    },
    getAnswerSuccess: (state, action) => {
      state.get.isFetching = false;
      state.get.answer = action.payload;
      state.get.error = false;
    },
    getAnswerFailure: (state) => {
      state.get.isFetching = false;
      state.get.error = true;
    },
    getAllAnswersStart: (state) => {
      state.getAll.isFetching = true;
    },
    getAllAnswersSuccess: (state, action) => {
      state.getAll.isFetching = false;
      state.getAll.answers = action.payload;
      state.getAll.error = false;
    },
    getAllAnswersFailure: (state) => {
      state.getAll.isFetching = false;
      state.getAll.error = true;
    },
    createAnswerStart: (state) => {
      state.create.isFetching = true;
    },
    createAnswerSuccess: (state, action) => {
      state.create.isFetching = false;
      state.create.createdAnswer = action.payload;
      state.create.error = false;
    },
    createAnswerFailure: (state) => {
      state.create.isFetching = false;
      state.create.error = true;
    },
    updateAnswerStart: (state) => {
      state.update.isFetching = true;
    },
    updateAnswerSuccess: (state, action) => {
      state.update.isFetching = false;
      state.update.updatedAnswer = action.payload;
      state.update.error = false;
    },
    updateAnswerFailure: (state) => {
      state.update.isFetching = false;
      state.update.error = true;
    },
    deleteAnswerStart: (state) => {
      state.delete.isFetching = true;
    },
    deleteAnswerSuccess: (state) => {
      state.delete.isFetching = false;
      state.delete.error = false;
    },
    deleteAnswerFailure: (state) => {
      state.delete.isFetching = false;
      state.delete.error = true;
    },
  },
});

export const {
  getAnswerStart,
  getAnswerSuccess,
  getAnswerFailure,
  getAllAnswersStart,
  getAllAnswersSuccess,
  getAllAnswersFailure,
  createAnswerStart,
  createAnswerSuccess,
  createAnswerFailure,
  updateAnswerStart,
  updateAnswerSuccess,
  updateAnswerFailure,
  deleteAnswerStart,
  deleteAnswerSuccess,
  deleteAnswerFailure,
} = answerSlide.actions;
export default answerSlide.reducer;
