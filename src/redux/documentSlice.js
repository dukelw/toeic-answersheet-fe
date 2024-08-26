import { createSlice } from "@reduxjs/toolkit";

const documentSlide = createSlice({
  name: "document",
  initialState: {
    get: {
      document: null,
      isFetching: false,
      error: false,
    },
    getAll: {
      documents: null,
      isFetching: false,
      error: false,
    },
    create: {
      createdDocument: null,
      isFetching: false,
      error: false,
    },
    update: {
      updatedDocument: null,
      isFetching: false,
      error: false,
    },
    delete: {
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    getDocumentStart: (state) => {
      state.get.isFetching = true;
    },
    getDocumentSuccess: (state, action) => {
      state.get.isFetching = false;
      state.get.document = action.payload;
      state.get.error = false;
    },
    getDocumentFailure: (state) => {
      state.get.isFetching = false;
      state.get.error = true;
    },
    getAllDocumentsStart: (state) => {
      state.getAll.isFetching = true;
    },
    getAllDocumentsSuccess: (state, action) => {
      state.getAll.isFetching = false;
      state.getAll.documents = action.payload;
      state.getAll.error = false;
    },
    getAllDocumentsFailure: (state) => {
      state.getAll.isFetching = false;
      state.getAll.error = true;
    },
    createDocumentStart: (state) => {
      state.create.isFetching = true;
    },
    createDocumentSuccess: (state, action) => {
      state.create.isFetching = false;
      state.create.createdDocument = action.payload;
      state.create.error = false;
    },
    createDocumentFailure: (state) => {
      state.create.isFetching = false;
      state.create.error = true;
    },
    updateDocumentStart: (state) => {
      state.update.isFetching = true;
    },
    updateDocumentSuccess: (state, action) => {
      state.update.isFetching = false;
      state.update.updatedDocument = action.payload;
      state.update.error = false;
    },
    updateDocumentFailure: (state) => {
      state.update.isFetching = false;
      state.update.error = true;
    },
    deleteDocumentStart: (state) => {
      state.delete.isFetching = true;
    },
    deleteDocumentSuccess: (state) => {
      state.delete.isFetching = false;
      state.delete.error = false;
    },
    deleteDocumentFailure: (state) => {
      state.delete.isFetching = false;
      state.delete.error = true;
    },
  },
});

export const {
  getDocumentStart,
  getDocumentSuccess,
  getDocumentFailure,
  getAllDocumentsStart,
  getAllDocumentsSuccess,
  getAllDocumentsFailure,
  createDocumentStart,
  createDocumentSuccess,
  createDocumentFailure,
  updateDocumentStart,
  updateDocumentSuccess,
  updateDocumentFailure,
  deleteDocumentStart,
  deleteDocumentSuccess,
  deleteDocumentFailure,
} = documentSlide.actions;
export default documentSlide.reducer;
