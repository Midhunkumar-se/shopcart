import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import productReducer from "./slice/productSlice";
import filterReducer from "./slice/filterSlice";
import cartReducer from "./slice/cartSlice";
import orderReducer from "./slice/orderSlice";
import checkoutReducer from "./slice/checkoutSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  filter: filterReducer,
  cart: cartReducer,
  orders: orderReducer,
  checkout: checkoutReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
