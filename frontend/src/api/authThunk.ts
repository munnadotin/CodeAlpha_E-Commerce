import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Address, LoginCredentials, RegisterCredentials } from "../types/auth.type";
import { addAddress, deleteAddress, loginUser, registerUser, updateAddress } from "../services/auth.service";
import { ENDPOINTS } from "./endpoints";
import toast from "react-hot-toast";

export const loginThunk = createAsyncThunk(ENDPOINTS.AUTH.LOGIN, async (data: LoginCredentials, thunkAPI) => {
    try {
        return await loginUser(data);
    } catch (error: any) {
        toast.error(error.message)
        return thunkAPI.rejectWithValue({
            message: error.message
        });
    }
});

export const registerThunk = createAsyncThunk(ENDPOINTS.AUTH.REGISTER, async (data: RegisterCredentials, thunkAPI) => {
    try {
        return await registerUser(data);
    } catch (error: any) {
        toast.error(error.message)
        return thunkAPI.rejectWithValue({
            message: error.message
        });
    }
});

export const addAddressThunk = createAsyncThunk("/login/address", async (data: Address, thunkAPI) => {
    try {
        return await addAddress(data);
    } catch (error: any) {
        toast.error(error.message)
        return thunkAPI.rejectWithValue({
            message: error.message
        });
    }
})

export const updateAddressThunk = createAsyncThunk("/login/update-address", async ({ data, addressId }: { data: Address, addressId: string }, thunkAPI) => {
    try {
        return await updateAddress(data, addressId);
    } catch (error: any) {
        toast.error(error.message)
        return thunkAPI.rejectWithValue({
            message: error.message
        });
    }
})

export const deleteAddressThunk = createAsyncThunk("/login/delete-address", async (addressId: string, thunkAPI) => {
    try {
        return await deleteAddress(addressId);
    } catch (error: any) {
        toast.error(error.message)
        return thunkAPI.rejectWithValue({
            message: error.message
        });
    }
})