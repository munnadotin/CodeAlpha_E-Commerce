import { createSlice } from "@reduxjs/toolkit";
import type { Product } from "../types/product.type";
import { productThunk } from "../api/productThunk";

const initialState = {
    products: [] as Product[],
    pagination: {},
    loading: false,
    error: null as string | null,
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(productThunk.pending, (state) => {
                state.loading = true;
            })

            .addCase(productThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
                state.pagination = action.payload.pagination;
            })

            .addCase(productThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
})

export default productSlice.reducer;