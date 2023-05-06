import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllMedias = createAsyncThunk(
  "medias/fetchAllMedias",
  async () => {
    const res = await fetch("http://localhost:3001/medias");
    const medias = res.json();
    return medias;
  }
);

export const moveMedia = createAsyncThunk(
  "media/moveMedia",
  async ({folderId, mediaId}, { dispatch }) => {
    console.log('moved')
    const res = await fetch("http://localhost:3001/medias/move", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mediaId,
        folderId,
      }),
    });
    const data = await res.json();
    return data;
  }
);

export const createMedia = createAsyncThunk(
  "media/createMedia",
  async (mediaName, { dispatch, getState }) => {

    const {
      ui: { activeFolder },
    } = getState();
    const res = await fetch("http://localhost:3001/medias", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mediaName,
        folderId: ["all", "uncategorized"].includes(activeFolder)
          ? null
          : activeFolder,
      }),
    });
    const data = res.json();
    return data;
  }
);

const initialState = {
  loading: false,
  mediaList: [],
};

export const mediaSlice = createSlice({
  name: "medias",
  initialState,
  reducers: {
    setAddMediaInput: (state, action) => {
      state.addmediaInput = action.payload;
    },
    setMediaList: (state, { payload }) => {
      state.mediaList = payload;
    },
  },
  extraReducers: {
    [fetchAllMedias.fulfilled]: (state, action) => {
      state.mediaList = action.payload;
    },
    [createMedia.fulfilled]: (state, action) => {
      state.mediaList = action.payload;
    },

    [moveMedia.fulfilled]: (state, { payload }) => {
      state.mediaList = payload;
    },
  },
});

export const { setAddMediaInput, setMediaList } = mediaSlice.actions;

export default mediaSlice.reducer;