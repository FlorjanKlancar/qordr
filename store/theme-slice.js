import { createSlice } from "@reduxjs/toolkit";

const themeInitialState = { isDarkTheme: false };

const themeSlice = createSlice({
  name: "theme",
  initialState: themeInitialState,
  reducers: {
    changeTheme(state, action) {
      state.isDarkTheme = action.payload;
    },
  },
});

export const themeActions = themeSlice.actions;

export default themeSlice;
