import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;