import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AUTHAPI } from "../../../axios";
import { User, ProfileState } from "../../../types/types";

const initialState: ProfileState = {
  data: null,
  loading: false,
  error: null,
};





export const fetchProfile = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>("profile/fetchProfile", async (_, { rejectWithValue }) => {
  try {
    const response = await AUTHAPI.get("auth/profile/");

    localStorage.setItem("userID", response.data.id);

    return response.data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/not-found";
    }
    const message =
      `${error.response?.data?.detail}` || error.message || "Что-то пошло не так";
    return rejectWithValue(message);
  }
});


const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Ошибка загрузки профиля";
      })
  },
});

export default profileSlice.reducer;
