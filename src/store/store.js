import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./uiSlice";
import mediaSlice from "./mediaSlice";
import folderSlice from "./folderSlice";
import authSlice from "./authSlice";

export const store = configureStore({
  reducer: {
    ui: uiSlice,
    medias: mediaSlice,
    folders: folderSlice,
    auth:  authSlice

  },
});
