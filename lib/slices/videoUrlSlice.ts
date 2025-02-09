import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface videoUrlState {
  url: string;
}

const initialState: videoUrlState = {
  url: "",
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setVideo: (state, action: PayloadAction<string>) => {
      state.url = action.payload;
    },
  },
});

export const { setVideo } = videoSlice.actions;
export const videoReducer = videoSlice.reducer;
