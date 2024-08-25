import { createSlice } from "@reduxjs/toolkit";

const historySlide = createSlice({
  name: "history",
  initialState: {
    get: {
      history: null,
      isFetching: false,
      error: false,
    },
    getAll: {
      historys: null,
      isFetching: false,
      error: false,
    },
    getHighest: {
      highest: null,
      isFetching: false,
      error: false,
    },
    create: {
      createdHistory: null,
      isFetching: false,
      error: false,
    },
    delete: {
      isFetching: false,
      error: false,
    },
    rank: {
      rank: null,
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    getHistoryStart: (state) => {
      state.get.isFetching = true;
    },
    getHistorySuccess: (state, action) => {
      state.get.isFetching = false;
      state.get.history = action.payload;
      state.get.error = false;
    },
    getHistoryFailure: (state) => {
      state.get.isFetching = false;
      state.get.error = true;
    },
    getAllHistorysStart: (state) => {
      state.getAll.isFetching = true;
    },
    getAllHistorysSuccess: (state, action) => {
      state.getAll.isFetching = false;
      state.getAll.historys = action.payload;
      state.getAll.error = false;
    },
    getAllHistorysFailure: (state) => {
      state.getAll.isFetching = false;
      state.getAll.error = true;
    },
    getHighestStart: (state) => {
      state.getHighest.isFetching = true;
    },
    getHighestSuccess: (state, action) => {
      state.getHighest.isFetching = false;
      state.getHighest.highest = action.payload;
      state.getHighest.error = false;
    },
    getHighestFailure: (state) => {
      state.getHighest.isFetching = false;
      state.getAll.error = true;
    },
    createHistoryStart: (state) => {
      state.create.isFetching = true;
    },
    createHistorySuccess: (state, action) => {
      state.create.isFetching = false;
      state.create.createdHistory = action.payload;
      state.create.error = false;
    },
    createHistoryFailure: (state) => {
      state.create.isFetching = false;
      state.create.error = true;
    },
    updateHistoryStart: (state) => {
      state.update.isFetching = true;
    },
    updateHistorySuccess: (state, action) => {
      state.update.isFetching = false;
      state.update.updatedHistory = action.payload;
      state.update.error = false;
    },
    updateHistoryFailure: (state) => {
      state.update.isFetching = false;
      state.update.error = true;
    },
    deleteHistoryStart: (state) => {
      state.delete.isFetching = true;
    },
    deleteHistorySuccess: (state) => {
      state.delete.isFetching = false;
      state.delete.error = false;
    },
    deleteHistoryFailure: (state) => {
      state.delete.isFetching = false;
      state.delete.error = true;
    },
    getRankOfATestStart: (state) => {
      state.rank.isFetching = true;
    },
    getRankOfATestSuccess: (state, action) => {
      state.rank.isFetching = false;
      state.rank.rank = action.payload;
      state.rank.error = false;
    },
    getRankOfATestFailure: (state) => {
      state.rank.isFetching = false;
      state.rank.error = true;
    },
  },
});

export const {
  getHistoryStart,
  getHistorySuccess,
  getHistoryFailure,
  getAllHistorysStart,
  getAllHistorysSuccess,
  getAllHistorysFailure,
  getHighestStart,
  getHighestSuccess,
  getHighestFailure,
  createHistoryStart,
  createHistorySuccess,
  createHistoryFailure,
  updateHistoryStart,
  updateHistorySuccess,
  updateHistoryFailure,
  deleteHistoryStart,
  deleteHistorySuccess,
  deleteHistoryFailure,
  getRankOfATestStart,
  getRankOfATestSuccess,
  getRankOfATestFailure,
} = historySlide.actions;
export default historySlide.reducer;
