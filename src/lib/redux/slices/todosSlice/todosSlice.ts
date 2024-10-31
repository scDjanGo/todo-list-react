import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { TodoType, TodosState } from "../../../types/types";

const initialState: TodosState = {
    value: null,
    status: "loading",
    error: null,
};

export const fetchTodosSlice = createAsyncThunk<TodoType[], void, { state: RootState; rejectValue: string }>(
    "todos/fetchTodosSlice", async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('https://672282882108960b9cc4b2e2.mockapi.io/auth/todo');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error: unknown) {
            let message;

            if (error instanceof Error) {
                message = error.message;
            } else {
                message = "Something went wrong";
            }

            return rejectWithValue(message);
        }
    }

);

const itemsSlice = createSlice({
    name: "items",
    initialState,
    reducers: {
        setInitialItems: (state, action: PayloadAction<TodoType[]>) => {
            state.value = action.payload;
            state.status = "succeeded";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodosSlice.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(
                fetchTodosSlice.fulfilled,
                (state, action: PayloadAction<TodoType[]>) => {
                    state.status = "succeeded";
                    state.value = action.payload;
                }
            )
            .addCase(
                fetchTodosSlice.rejected,
                (state, action: PayloadAction<string | undefined>) => {
                    state.status = "failed";
                    state.error = action.payload || "Failed to fetch items data";
                }
            );
    },
});

export const { setInitialItems } = itemsSlice.actions;
export default itemsSlice.reducer;
