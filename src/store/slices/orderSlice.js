import {createSlice} from '@reduxjs/toolkit';

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    cart: [],
    subTotal: 0,
  },
  reducers: {
    getCart: state => state.cart,

    generateCart: (state, action) => {
      state.cart = action.payload;
      state.subTotal = action.payload[0].price;
    },
    addToCart: (state, action) => {
      state.cart = action.payload;
      // return action.payload;
    },
    removeFromCart: (state, action) => {
      state.cart = action.payload;
    },
  },
  extraReducers(builder) {
    builder;
  },
});

export const {getCart, generateCart, addToCart, removeFromCart} =
  orderSlice.actions;

export default orderSlice.reducer;
