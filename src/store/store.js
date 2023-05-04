import { configureStore } from '@reduxjs/toolkit'
import uiSlice from './uiSlice'
import bookSlice from './bookSlice'

export const store = configureStore({
  reducer: {
    ui: uiSlice,
    books: bookSlice
  },
})