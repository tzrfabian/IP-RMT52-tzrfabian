import { configureStore } from '@reduxjs/toolkit'
import imageReducer from './slices/myImageSlices'
export const store = configureStore({
  reducer: {
    images: imageReducer
  },
})