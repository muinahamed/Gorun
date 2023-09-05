import {createSlice} from '@reduxjs/toolkit';

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    cart: [],
  },
  reducers: {
    getCart: state => state.cart,
  },
  extraReducers(builder) {
    builder;
  },
});

export const {
  allOrders,
  setActiveOrderId,
  newOrderCall,
  seenNewOrder,
  changeIsLoginStatus,
  changeCoordinate,
} = orderSlice.actions;

export default orderSlice.reducer;
