import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null | void;
}

const initialState: AuthState = {
  token: localStorage.getItem("token") 
};

const authSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
      if (action.payload) {
        localStorage.setItem("token", action.payload);
      } else {
        localStorage.removeItem("token");
      }
    },
  },
});

export const { setToken } = authSlice.actions;
export default authSlice.reducer;
