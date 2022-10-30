import {createSlice} from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: localStorage.getItem('cartItems')?
      JSON.parse(localStorage.getItem('cartItems'))
      :[],
    shippingAddress: localStorage.getItem('shippingAddress')?
      JSON.parse(localStorage.getItem('shippingAddress'))
      :{},
    paymentMethod: localStorage.getItem('paymentMethod')?
      JSON.parse(localStorage.getItem('paymentMethod'))
      :null,
  },
  reducers: {
    cartAddItem: (state, action) => {
      let product = action.payload
      const existItem = state.cartItems.find((prev) =>
        product.productID === prev.productID
      );
      if (existItem) {
        state.cartItems = state.cartItems.map((prev) => 
          prev.productID === product.productID?
            product:prev
        )
      } else {
        state.cartItems = [...state.cartItems, product]
      }
    },
    cartDeleteItem: (state, action) => {
      state.cartItems = state.cartItems.filter((product) => product.productID !== action.payload);
    },
    cartSaveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload
    },
    cartSavePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload
    },
  }
})

export const {
  cartAddItem,
  cartDeleteItem,
  cartSaveShippingAddress,
  cartSavePaymentMethod,
} = cartSlice.actions;
export default cartSlice.reducer;