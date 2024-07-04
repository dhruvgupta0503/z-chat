import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth"; // Ensure you're importing the reducer, not the slice

const store = configureStore({
  reducer: {
    auth: authReducer, // Directly use the reducer here
  },
});

export default store;
