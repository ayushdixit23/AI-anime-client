import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface videoUrlState {
  url: string;
}

const initialState: videoUrlState = {
  url: "https://ddr8m0gdhyi51.cloudfront.net/death-note-8615/1738676496209_89b101c6-c142-4b9e-b8f9-e15dee255b23_Rebirth/480.m3u8",
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
