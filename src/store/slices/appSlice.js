import {createSlice} from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    darkMode: false,
  },
  reducers: {
    toggleTheme: (state, actions) => {
      console.log('log-actions.payload', actions.payload);
      state.darkMode = actions.payload;
      console.log('log-state.darkMode', state.darkMode);
    },
  },
});

export const {toggleTheme} = appSlice.actions;

export default appSlice.reducer;
