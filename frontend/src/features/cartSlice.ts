import { createSlice } from "@reduxjs/toolkit";
import type { CartType } from "../types/cart.type";
import { addCartItemThunk, cartThunk, removeCartItemThunk, updateCartItemThunk } from "../api/cartThunk";

const initialState = {
    products: {} as CartType,
    loading: false,
    error: null as string | null
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(cartThunk.pending, (state) => {
                state.loading = true;
            })

            // main cart
            .addCase(cartThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.data;
            })
            // update cart qunatity
            .addCase(updateCartItemThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.data;
            })
            // add to cart
            .addCase(addCartItemThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.data;
            })

            // remove from cart
            .addCase(removeCartItemThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.data;
            })

            .addCase(cartThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch cart";
            })
    }
})

export default cartSlice.reducer;