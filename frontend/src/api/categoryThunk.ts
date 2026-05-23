import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCategory } from "../services/category.service";

export const categoryThunk = createAsyncThunk("categories/getAll", async (_, thunkAPI) => {
    try {
        return await getCategory();
    } catch (error: any) {
        return thunkAPI.rejectWithValue({
            message: error.message
        });
    }
});