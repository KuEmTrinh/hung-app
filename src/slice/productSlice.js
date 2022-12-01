import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  typeId: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setTypeId: (state, action) => {
      state.typeId = action.payload;
    },
  },
});

export const { setTypeId } = productSlice.actions;

export default productSlice.reducer;
