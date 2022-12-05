import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import productReducer from "../slice/productSlice";
import loginReducer from "../slice/loginSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    product: productReducer,
    login: loginReducer,
  },
});
