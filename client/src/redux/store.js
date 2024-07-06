import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth"; // Ensure you're importing the reducer, not the slice
import api from "./api/api";
import miscReducer from "./reducers/misc";

const store = configureStore({
  reducer: {
    auth: authReducer, // Directly use the reducer here
    misc:miscReducer,
    [api.reducerPath]:api.reducer,
  },
  middleware:(mid)=>[...mid(),api.middleware],
});

export default store;
