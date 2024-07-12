import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth"; // Ensure you're importing the reducer, not the slice
import api from "./api/api";
import miscReducer from "./reducers/misc";
import chatReducer from "./reducers/chat";

const store = configureStore({
  reducer: {
    auth: authReducer, // Directly use the reducer here
    misc:miscReducer,
    chat: chatReducer,
    [api.reducerPath]:api.reducer,
  },
  middleware:(mid)=>[...mid(),api.middleware],
});

export default store;
