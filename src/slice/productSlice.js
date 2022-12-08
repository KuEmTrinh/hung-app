import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  typeId: null,
  typeLength: 0,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setTypeId: (state, action) => {
      state.typeId = action.payload;
    },
    setTypeLength: (state, action) => {
      state.typeLength = action.payload;
    },
  },
});

export const { setTypeId, setTypeLength } = productSlice.actions;

export default productSlice.reducer;
