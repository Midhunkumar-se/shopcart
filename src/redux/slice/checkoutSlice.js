import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shippingAddress: localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : {},
  billingAddress: {},
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    SAVE_SHIPPING_ADDRESS(state, action) {
      state.shippingAddress = action.payload;
      // save cart to LS
      localStorage.setItem("shippingAddress", JSON.stringify(action.payload));
    },
    SAVE_BILLING_ADDRESS(state, action) {
      state.billingAddress = action.payload;
    },
  },
});

export const { SAVE_BILLING_ADDRESS, SAVE_SHIPPING_ADDRESS } =
  checkoutSlice.actions;

export const selectShippingAddress = (state) => state.checkout.shippingAddress;
export const selectBillingAddress = (state) => state.checkout.billingAddress;

export default checkoutSlice.reducer;
