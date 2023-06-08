import { configureStore } from "@reduxjs/toolkit";
import favoriteReducer from "./favorite";

const globalStore = configureStore({
  reducer: {
    favoriteReducer
  },
});

export default globalStore;