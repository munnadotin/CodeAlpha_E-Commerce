import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { createOrderService, getOrderByIdService, getOrdersService } from "../services/order.service";

export const getOrdersThunk = createAsyncThunk("orders/get", async (_, thunkApi) => {
    try {
        return await getOrdersService();
    } catch (error: any) {
        toast.error(error.message);
        return thunkApi.rejectWithValue({
            message: error.message
        });
    }
});

export const createOrderThunk = createAsyncThunk("orders/create", async (paymentMethod: 'cod' | 'upi', thunkApi) => {
    try {
        return await createOrderService(paymentMethod);
    } catch (error: any) {
        toast.error(error.message);
        return thunkApi.rejectWithValue({
            message: error.message
        });
    }
});

export const getOrderByIdThunk = createAsyncThunk("orders/getById", async (orderId: string, thunkApi) => {
    try {
        return await getOrderByIdService(orderId);
    } catch (error: any) {
        toast.error(error.message);
        return thunkApi.rejectWithValue({
            message: error.message
        });
    }
});