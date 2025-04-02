import {configureStore} from '@reduxjs/toolkit';
// import bookListReducer from '../BookSlice';
// import financeReducer from "./financeSlice";
import financeReducer from "./FinanceSlice";

const Store = configureStore({
  reducer: {
    financeList: financeReducer
  }
})

export default Store;