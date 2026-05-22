import { createAsyncThunk } from "@reduxjs/toolkit";
import { ENDPOINTS } from "./endpoints";
import { productServer } from "../services/product.server";
import toast from "react-hot-toast";

export const productThunk = createAsyncThunk(ENDPOINTS.PRODUCTS.ALL, async (_, thunkAPI) => {
    try {
        return await productServer();
    } catch (error: any) {
        toast.error(error.message);
        return thunkAPI.rejectWithValue({
            message: error.message
        });
    }
})