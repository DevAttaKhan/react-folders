import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addBookInput: false,
  activeFolder: "all",
  folderInput: false,
  openedFolders: [],
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setAddBookInput: (state, action) => {
      state.addBookInput = action.payload;
    },
    setActiveFolder: (state, { payload }) => {
      state.activeFolder = payload;
    },
    setFolderInput: (state, { payload }) => {
      state.folderInput = payload ? payload : !state.folderInput;
    },
    setOpenedFolders: (state, { payload }) => {
      switch (payload.type) {
        case "ROOT_FOLDER":
          state.openedFolders = [...state.openedFolders, payload.id];
          break;
        case "CLOSE_FOLDER":
          state.openedFolders = state.openedFolders
            .filter((e) => !["all", "uncategorized"].includes(e))
            .filter((e) => e !== payload.id);
          break;
        case "OPEN_FOLDER":
          state.openedFolders = [
            ...state.openedFolders.filter(
              (e) => !["all", "uncategorized"].includes(e)
            ),
            payload.id,
          ];
          break;
        case "CLOSE_ROOT_FOLDER":
          state.openedFolders = state.openedFolders.filter(
            (e) => !["all", "uncategorized"].includes(e)
          );
          break;
        default:
          state.openedFolders = [];
      }
    },
  },
});

export const {
  setAddBookInput,
  setActiveFolder,
  setFolderInput,
  setOpenedFolders,
} = uiSlice.actions;

export default uiSlice.reducer;
