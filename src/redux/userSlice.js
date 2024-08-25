import { createSlice } from "@reduxjs/toolkit";

const userSlide = createSlice({
  name: "user",
  initialState: {
    signin: {
      currentUser: null,
      isFetching: false,
      error: false,
    },
    signup: {
      isFetching: false,
      error: false,
      success: false,
    },
    logout: {
      isFetching: false,
      error: false,
    },
    find: {
      foundUser: null,
      isFetching: false,
      error: false,
    },
    update: {
      isFetching: false,
      error: false,
    },
    password: {
      success: null,
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    userSigninStart: (state) => {
      state.signin.isFetching = true;
    },
    userSigninSuccess: (state, action) => {
      state.signin.isFetching = false;
      state.signin.currentUser = action.payload;
      state.signin.error = false;
    },
    userSigninFailure: (state) => {
      state.signin.isFetching = false;
      state.signin.error = true;
    },
    userSignupStart: (state) => {
      state.signup.isFetching = true;
    },
    userSignupSuccess: (state) => {
      state.signup.isFetching = false;
      state.signup.error = false;
      state.signup.success = true;
    },
    userSignupFailure: (state) => {
      state.signup.isFetching = false;
      state.signup.error = true;
      state.signup.success = false;
    },
    userLogoutStart: (state) => {
      state.signin.isFetching = true;
    },
    userLogoutSuccess: (state) => {
      state.signin.isFetching = false;
      state.signin.currentUser = null;
      state.signin.error = false;
    },
    userLogoutFailure: (state) => {
      state.signin.isFetching = false;
      state.signin.error = true;
    },
    findUserStart: (state) => {
      state.find.isFetching = true;
    },
    findUserSuccess: (state, action) => {
      state.find.isFetching = false;
      state.find.foundUser = action.payload;
      state.find.error = false;
    },
    findUserFailure: (state) => {
      state.find.isFetching = false;
      state.find.error = true;
    },
    updateUserStart: (state) => {
      state.update.isFetching = true;
    },
    updateUserSuccess: (state) => {
      state.update.isFetching = false;
      state.update.error = false;
    },
    updateUserFailure: (state) => {
      state.update.isFetching = false;
      state.update.error = true;
    },
    changePasswordStart: (state) => {
      state.password.isFetching = true;
    },
    changePasswordSuccess: (state, action) => {
      state.password.success = action.payload;
      state.password.isFetching = false;
      state.password.error = false;
    },
    changePasswordFailure: (state) => {
      state.password.isFetching = false;
      state.password.error = true;
    },
  },
});

export const {
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
} = userSlide.actions;
export default userSlide.reducer;
