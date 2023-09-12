import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import API from '../../service/API';
import {IMAGE_UPLOAD_ENDPOINT} from '../../service/ApiEndPoint';

export const uploadImage = createAsyncThunk(
  'image/uploadSingle',
  async imageData => {
    const response = await API.post(IMAGE_UPLOAD_ENDPOINT, imageData, {
      noAuth: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response);
    return response || {};
  },
);

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
