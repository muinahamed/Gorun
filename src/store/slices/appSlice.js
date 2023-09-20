import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import API from '../../service/API';
import {IMAGE_UPLOAD_ENDPOINT} from '../../service/ApiEndPoint';

export const uploadImage = createAsyncThunk(
  'image/uploadSingle',
  async imageData => {
    const data = {
      body: imageData,
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const fetchResponse = await fetch(IMAGE_UPLOAD_ENDPOINT, data);
    const response = await fetchResponse.json();

    return response || {};
  },
);

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    confirmation: null,
    firstTimeLaunch: true,
    user: null,
    token: null,
  },
  reducers: {
    setConfirmation: (state, action) => {
      state.confirmation = action.payload;
    },
    setFirstTimeLaunch: (state, action) => {
      state.firstTimeLaunch = false;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const {setFirstTimeLaunch, setConfirmation, setUser, setToken} =
  appSlice.actions;

export default appSlice.reducer;
