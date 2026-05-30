import { createSlice } from "@reduxjs/toolkit";
import type { category } from "../types/category.type";
import { categoryThunk } from "../api/categoryThunk";

const initialState: {
    categories: category[];
    loading: boolean;
    error: string | null;
} = {
    categories: [] as category[],
    loading: false,
    error: null
}

const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(categoryThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(categoryThunk.fulfilled, (state, action) => {
                state.categories = action.payload.categories as category[];
                state.loading = false;
            })
            .addCase(categoryThunk.rejected, (state, action) => {
                state.error = action.error.message || null;
                state.loading = false;
            })
    }
})

export default categorySlice.reducer;