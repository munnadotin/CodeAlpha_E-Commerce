import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { getOrdersService } from "../services/order.service";

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