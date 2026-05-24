import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCartItems } from "../services/cart.service";
import toast from "react-hot-toast";

export const cartThunk = createAsyncThunk("cart/getAll", async (_, thunkAPI) => {
    try {
        return await getCartItems();
    } catch (error: any) {
        toast.error(error.message);
        return thunkAPI.rejectWithValue({
            message: error.message
        });
    }
});