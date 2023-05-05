import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./uiSlice";
import bookSlice from "./bookSlice";
import folderSlice from "./folderSlice";

export const store = configureStore({
  reducer: {
    ui: uiSlice,
    books: bookSlice,
    folders: folderSlice,
  },
});
