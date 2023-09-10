import {createSlice} from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    confirmation: null,
  },
  reducers: {
    setConfirmation: (state, action) => {
      state.confirmation = action.payload;
    },
  },
});

export const {toggleTheme, setConfirmation} = appSlice.actions;

export default appSlice.reducer;
