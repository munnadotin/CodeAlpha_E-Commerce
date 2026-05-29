import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { createCardOrderService, createOrderService, getOrderByIdService, getOrdersAdminService, getOrdersService, updateOrderById } from "../services/order.service";


type UpdateOrderType = {
    paymentStatus?: "paid" | "pending"
    status?: "processing" | "shipped" | "delivered" | "cancelled"
}

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

export const createCardOrderThunk = createAsyncThunk("orders/createCard", async (paymentMethod: 'cod' | 'upi', thunkApi) => {
    try {
        return await createCardOrderService(paymentMethod);
    } catch (error: any) {
        toast.error(error.message);
        return thunkApi.rejectWithValue({
            message: error.message
        });
    }
});

// ============================ admin =====================================

export const getAdminOrdersThunk = createAsyncThunk("orders/getAdmin", async (_, thunkApi) => {
    try {
        return await getOrdersAdminService();
    } catch (error: any) {
        toast.error(error.message);
        return thunkApi.rejectWithValue({
            message: error.message
        });
    }
});

export const updateOrdersThunk = createAsyncThunk("orders/update", async ({ data, orderId }: { data: UpdateOrderType, orderId: string }, thunkApi) => {
    try {
        return await updateOrderById(orderId, data);
    } catch (error: any) {
        toast.error(error.message);
        return thunkApi.rejectWithValue({
            message: error.message
        });
    }
});
