import {configureStore} from '@reduxjs/toolkit';
import financeReducer from "./FinanceSlice";

// Sets up the Redux store
const Store = configureStore({
  reducer: {
    financeList: financeReducer
  }
})

export default Store;