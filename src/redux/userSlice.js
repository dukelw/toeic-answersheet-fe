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
} = userSlide.actions;
export default userSlide.reducer;
