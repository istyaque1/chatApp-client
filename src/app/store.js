import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice.js";
import getUsersReducer from "../features/getUsersSlice.js";
import messageReducer from "../features/messageSlice.js"

export const store = configureStore({
  reducer: {
    user: userReducer,
    getUsers:getUsersReducer,
    messages:messageReducer
  },
});
