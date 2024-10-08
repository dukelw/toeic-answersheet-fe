import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import uploadReducer from "./uploadSlice";
import answerReducer from "./answerSlice";
import historyReducer from "./historySlice";
import documentReducer from "./documentSlice";
import sliderReducer from "./sliderSlice";
import commentReducer from "./commentSlice";
import notificationReducer from "./notificationSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  upload: uploadReducer,
  answer: answerReducer,
  history: historyReducer,
  document: documentReducer,
  slider: sliderReducer,
  comment: commentReducer,
  notification: notificationReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
