import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllBooks = createAsyncThunk(
  "books/fetchAllBooks",
  async () => {
    const res = await fetch("http://localhost:3001/books");
    const books = res.json();
    return books;
  }
);

export const postBook = createAsyncThunk(
  "book/postBook",
  async (bookName, { dispatch, getState }) => {
    const {
      ui: { activeFolder },
    } = getState();
    const res = await fetch("http://localhost:3001/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookName,
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
  bookList: [],
};

export const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setAddBookInput: (state, action) => {
      state.addBookInput = action.payload;
    },
    setBookList: (state, { payload }) => {
      state.bookList = payload;
    },
  },
  extraReducers: {
    [fetchAllBooks.fulfilled]: (state, action) => {
      state.bookList = action.payload;
    },
    [postBook.fulfilled]: (state, action) => {
      state.bookList = action.payload;
    },
  },
});

export const { setAddBookInput, setBookList } = bookSlice.actions;

export default bookSlice.reducer;
