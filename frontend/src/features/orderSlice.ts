import { createSlice } from "@reduxjs/toolkit";
import { getOrdersThunk } from "../api/orderThunk";
import type { OrdersType } from "../types/orders.type";

const initialState = {
    ordersList: [] as OrdersType[],
    order: null as OrdersType | null,
    loading: false,
    error: null as string | null,
}

const orderSlice = createSlice({
    name: 'ordres',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getOrdersThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getOrdersThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.ordersList = action.payload.data;
            })
            .addCase(getOrdersThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    }
})

export default orderSlice.reducer
