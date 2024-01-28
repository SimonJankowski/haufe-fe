import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  username: null,
  favorites: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token, username, favorites } = action.payload;
      state.token = token;
      state.username = username;
      state.favorites = favorites;
    },
    clearCredentials: (state) => {
      state.token = null;
      state.username = null;
      state.favorites = [];
    },
    updateFavorites: (state, action) => {
      state.favorites = action.payload;
    },
  },
});

export const { setCredentials, clearCredentials, updateFavorites } =
  authSlice.actions;
export default authSlice.reducer;
