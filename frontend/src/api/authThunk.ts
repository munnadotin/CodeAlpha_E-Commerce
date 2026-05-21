import { createAsyncThunk } from "@reduxjs/toolkit";
import type { LoginCredentials, RegisterCredentials } from "../types/auth.type";
import { loginUser, registerUser } from "../services/auth.service";
import { ENDPOINTS } from "./endPoints";
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
