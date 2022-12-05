import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  role: "user",
  token: "",
};

export const loginSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setRole, setToken } = loginSlice.actions;

export default loginSlice.reducer;
