import { createAsyncThunk } from "@reduxjs/toolkit";
import { addCartItem, getCartItems, removeCartItem, updateCartItem } from "../services/cart.service";
import toast from "react-hot-toast";

type AddCartItem = {
    productId: string;
    quantity: number;
}

type updateCartItem = {
    cartItemId: string;
    action: "increase" | "decrease";
}


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

export const addCartItemThunk = createAsyncThunk("cart/add", async (data: AddCartItem, thunkAPI) => {
    try {
        const response = await addCartItem(data.productId, data.quantity);
        return response;
    } catch (error: any) {
        toast.error(error.message);
        return thunkAPI.rejectWithValue({
            message: error.message
        });
    }
});

export const updateCartItemThunk = createAsyncThunk("cart/update", async (data: updateCartItem, thunkAPI) => {
    try {
        const response = await updateCartItem(data.cartItemId, data.action);
        return response;
    } catch (error: any) {
        toast.error(error.message);
        return thunkAPI.rejectWithValue({
            message: error.message
        });
    }
});

export const removeCartItemThunk = createAsyncThunk("cart/delete", async (data: { productId: string }, thunkAPI) => {
    try {
        const response = await removeCartItem(data.productId);
        return response;
    } catch (error: any) {
        toast.error(error.message);
        return thunkAPI.rejectWithValue({
            message: error.message
        });
    }
});