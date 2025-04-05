import { createSlice } from "@reduxjs/toolkit";

let initialState = { email: "", id: "", token: "" };

if (localStorage.getItem("user")) {
  initialState = JSON.parse(localStorage.getItem("user"));
} else {
  initialState = { value: initialState };
}

export const authReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.token = action.payload.token;
    },
    logout: (state, action) => {
      state.email = "";
      state.id = "";
      state.token = "";
    },
  },
});

export const { login, logout } = authReducer.actions;
export default authReducer.reducer;
