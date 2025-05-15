import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userListsReducer from "./slices/userListsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    userLists: userListsReducer,
  },
});

export default store;
