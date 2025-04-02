import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  finance: [],
}

const FinanceSlice = createSlice({
  name: 'finance', 
  initialState,
  reducers: {
    setFinance: (state, action) => {
      state.finance = action.payload;
    },
    toggleChecked: (state, action) => {
      // Access the state under finance
      const financeState = state.finance;

      // Iterate through each category in the state
      Object.keys(financeState).forEach(category => {
        if (financeState[category] && Array.isArray(financeState[category].items)) {
          // Find the item by its unique id
          const itemIndex = financeState[category].items.findIndex(
            (item) => item.id === action.payload // Compare using id
          );

          // If the item is found, toggle its checked state immutably
          if (itemIndex !== -1) {
            const updatedItems = [...financeState[category].items];
            updatedItems[itemIndex] = {
              ...updatedItems[itemIndex],
              checked: !updatedItems[itemIndex].checked,
            };

            // Update the state with the new items array
            financeState[category] = {
              ...financeState[category],
              items: updatedItems,
            };
          }
        }
      });
    }
  }
})

export const {setFinance, toggleChecked} = FinanceSlice.actions;

export default FinanceSlice.reducer;