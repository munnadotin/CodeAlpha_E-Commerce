import { createAsyncThunk } from "@reduxjs/toolkit";
import { productServer, productBySlugServer, productByCategoryServer, searchProduct } from "../services/product.server";
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

export const productBySlugThunk = createAsyncThunk("products/getBySlug", async (slug: string, thunkAPI) => {
    try {
        return await productBySlugServer(slug);
    } catch (error: any) {
        toast.error(error.message);
        return thunkAPI.rejectWithValue({
            message: error.message
        });
    }
})

export const productByCategoryThunk = createAsyncThunk("products/getByCategory", async (category: string, thunkAPI) => {
    try {
        return await productByCategoryServer(category);
    } catch (error: any) {
        toast.error(error.message);
        return thunkAPI.rejectWithValue({
            message: error.message
        });
    }
})

export const searchProductThunk = createAsyncThunk("product/search", async (query: string, thunkAPI) => {
    try {
        return await searchProduct(query);
    } catch (error: any) {
        toast.error(error.message);
        return thunkAPI.rejectWithValue({
            message: error.message
        });
    }
})