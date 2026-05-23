import { createSlice } from "@reduxjs/toolkit";
import type { Product } from "../types/product.type";
import { productBySlugThunk, productThunk } from "../api/productThunk";

const initialState = {
    products: [] as Product[],
    pagination: {},
    productDetails: null as Product | null,
    loading: false,
    error: null as string | null,
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // all products
            .addCase(productThunk.pending, (state) => {
                state.loading = true;
            })

            .addCase(productThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.data;
                state.pagination = action.payload.pagination;
            })

            .addCase(productThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // single product
            .addCase(productBySlugThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(productBySlugThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.productDetails = action.payload.data;
            })
            .addCase(productBySlugThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
})

export default productSlice.reducer;