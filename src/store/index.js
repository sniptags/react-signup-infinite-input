import { configureStore } from "@reduxjs/toolkit";
import cityReducer from "./citySlice";
import categoryReducer from './categorySlice'
import businessReducer from "./businessSlice";
import serviceReducer from "./serviceSlice";

const store = configureStore({ reducer: { city: cityReducer, businessData:businessReducer,category : categoryReducer,service : serviceReducer } });
export default store