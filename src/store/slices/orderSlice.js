import {createSlice} from '@reduxjs/toolkit';

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    cart: [],
    shopId: undefined,
    subTotal: 0,
  },
  reducers: {
    getCart: state => state.cart,

    generateCart: (state, action) => {
      state.cart = action.payload;
      state.subTotal = action.payload[0].price;
    },
    addToCart: (state, action) => {
      state.cart = action.payload?.updateCart;
      state.shopId = action?.payload?.shopId;
      // return action.payload;
    },
    removeFromCart: (state, action) => {
      state.cart = action.payload;
      if (action?.payload?.length == 0) {
        state.shopId = undefined;
      }
    },
  },
  extraReducers(builder) {
    builder;
  },
});

export const {getCart, generateCart, addToCart, removeFromCart} =
  orderSlice.actions;

export default orderSlice.reducer;
