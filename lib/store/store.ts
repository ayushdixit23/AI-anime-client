import { configureStore } from "@reduxjs/toolkit";
import { videoReducer } from "../slices/videoUrlSlice";

export const store = configureStore({
  reducer: {
    url: videoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
