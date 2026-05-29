import { createSlice } from "@reduxjs/toolkit";
import { createCardOrderThunk, createOrderThunk, getAdminOrdersThunk, getOrderByIdThunk, getOrdersThunk } from "../api/orderThunk";
import type { OrdersType } from "../types/orders.type";

const initialState = {
    ordersList: [] as OrdersType[],
    currentOrder: null as OrdersType | null,
    cardOrder: "",
    loading: false,
    error: null as string | null,
}

const orderSlice = createSlice({
    name: 'ordres',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // get orders only user
            .addCase(getOrdersThunk.pending, (state) => {
                state.loading = true;
            })

            // Get all orders
            .addCase(getOrdersThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.ordersList = action.payload.data;
            })

            // Get admin orders
            .addCase(getAdminOrdersThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.ordersList = action.payload.data;
            })

            // Create order
            .addCase(createOrderThunk.pending, (state) => {
                state.loading = true;
            })

            .addCase(createOrderThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.currentOrder = action.payload.data;
            })

            .addCase(createOrderThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Create card order
            .addCase(createCardOrderThunk.pending, (state) => {
                state.loading = true;
            })

            .addCase(createCardOrderThunk.fulfilled, (state, action) => {
                state.loading = false;
                console.log(action.payload.data)
                state.cardOrder = action.payload.data;
            })

            .addCase(createCardOrderThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Get order by id
            .addCase(getOrderByIdThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.currentOrder = action.payload.data;
            })

            .addCase(getOrdersThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    }
})

export default orderSlice.reducer
