import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllFolders = createAsyncThunk(
  "folders/fetchAllFolders",
  async () => {
    const res = await fetch("http://localhost:3001/folders");
    const data = await res.json();
    return data;
  }
);

export const deleteFolder = createAsyncThunk(
  "folders/deleteFolder",
  async (args, { getState }) => {
    try {
      const {
        ui: { activeFolder },
      } = getState();

      if (["all", "uncategorized"].includes(activeFolder)) return;
      console.log(activeFolder);

      const res = await fetch(`http://localhost:3001/folders/${activeFolder}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const createFolder = createAsyncThunk(
  "folders/createFolder",
  async ({ parentFolder, folderName }, { dispatch, getState }) => {
    try{
        console.log(parentFolder,folderName)
    const {
      ui: { activeFolder },
    } = getState();
    const res = await fetch("http://localhost:3001/folders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        folderName: folderName,
        parentFolder: ["all", "uncategorized"].includes(activeFolder)
          ? null
          : activeFolder,
      }),
    });
    const data = await res.json();
    return data;
} catch(err){
    console.log(err)
}
  }
);

const initialState = {
  loading: false,
  foldersList: [],
};

export const folderSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAllFolders.fulfilled]: (state, { payload }) => {
      state.foldersList = payload;
    },
    [deleteFolder.fulfilled]: (state, { payload }) => {
      state.foldersList = payload;
    },
    [createFolder.fulfilled]: (state, { payload }) => {
      state.foldersList = payload;
    },
  },
});

export const {} = folderSlice.actions;

export default folderSlice.reducer;
