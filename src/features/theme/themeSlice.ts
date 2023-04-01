import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const initialState = { isDarkMode: true };

const themeSlice = createSlice({
  name: "themeMode",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export const themeState=(state:RootState)=>state.theme.isDarkMode

export default themeSlice.reducer;
