import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllMedias = createAsyncThunk(
  "medias/fetchAllMedias",
  async (args, { getState }) => {
    const {
      auth: { user },
    } = getState();
    const res = await fetch("http://localhost:3001/medias", {
      method: "GET",
      headers: {
        authorization: `Bearer ${user.token}`,
      },
    });
    const medias = res.json();
    return medias;
  }
);

export const moveMedia = createAsyncThunk(
  "media/moveMedia",
  async ({ folderId, mediaId }, { dispatch, getState }) => {
    const {
      auth: { user },
    } = getState();
    const res = await fetch("http://localhost:3001/medias/move", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user.token}`,
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
  async (files, { dispatch, getState }) => {
    const {
      ui: { activeFolder },
      auth: { user },
    } = getState();
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i]);
    }
    formData.append("folderId", activeFolder === "all" ? null : activeFolder);
    const res = await fetch("http://localhost:3001/medias", {
      method: "POST",
      headers: {
        authorization: `Bearer ${user.token}`,
      },
      body: formData,
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
