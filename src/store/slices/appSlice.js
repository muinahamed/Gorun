import {createSlice} from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    confirmation: null,
    firstTimeLaunch: true,
  },
  reducers: {
    setConfirmation: (state, action) => {
      state.confirmation = action.payload;
    },
    setFirstTimeLaunch: (state, action) => {
      state.firstTimeLaunch = false;
    },
  },
});

export const {setFirstTimeLaunch, setConfirmation} = appSlice.actions;

export default appSlice.reducer;
