import {configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
import appSlice from './slices/appSlice';
import orderSlice from './slices/orderSlice';

const reducers = combineReducers({
  app: appSlice,
  orders: orderSlice,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['orders', 'app'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export default store;
