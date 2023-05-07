import { createAsyncThunk, createSlice, isFulfilled } from "@reduxjs/toolkit";

export const singIn = createAsyncThunk(
  "auth/signin",
  async (user, { dispatch }) => {
    const res = await fetch(" http://localhost:3001/user/sign-up", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    return data;
  }
);

export const logIn = createAsyncThunk(
  "auth/login",
  async (user, { dispatch }) => {
    const res = await fetch(" http://localhost:3001/user/login", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    return data;
  }
);

const initialState = {
  loading: false,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setStoredUser: (state, { payload }) => {
      state.user = payload;
    },
  },
  extraReducers: {
    [singIn.fulfilled]: (state, { payload }) => {
      state.user = payload;
    },
    [logIn.fulfilled]: (state, { payload }) => {
      state.user = payload;
    },
  },
});

export const { setStoredUser } = authSlice.actions;

export default authSlice.reducer;
