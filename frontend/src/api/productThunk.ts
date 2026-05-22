import { createAsyncThunk } from "@reduxjs/toolkit";
import { productServer, productByIdServer } from "../services/product.server";
import toast from "react-hot-toast";

export const productThunk = createAsyncThunk("products/getAll", async (_, thunkAPI) => {
    try {
        return await productServer();
    } catch (error: any) {
        toast.error(error.message);
        return thunkAPI.rejectWithValue({
            message: error.message
        });
    }
})

export const productByIdThunk = createAsyncThunk("products/getById", async (id: string, thunkAPI) => {
    try {
        return await productByIdServer(id);
    } catch (error: any) {
        toast.error(error.message);
        return thunkAPI.rejectWithValue({
            message: error.message
        });
    }
})