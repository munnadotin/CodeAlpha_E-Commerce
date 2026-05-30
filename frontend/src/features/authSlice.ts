import { createSlice } from "@reduxjs/toolkit";
import { addAddressThunk, deleteAddressThunk, loginThunk, updateAddressThunk } from "../api/authThunk";

const initialState: {
    user: any;
    token: string | null;
    loading: boolean;
    error: string | null;
} = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null,
    token: localStorage.getItem("token"),
    loading: false,
    error: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearUser: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginThunk.pending, (state) => {
                state.loading = true;
            })

            // full user + address details
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.accessToken;
                localStorage.setItem("user", JSON.stringify(action.payload.user));
                localStorage.setItem("token", action.payload.accessToken);
            })

            // add address
            .addCase(addAddressThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                localStorage.setItem("user", JSON.stringify(action.payload.user));
            })

            // update address
            .addCase(updateAddressThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                localStorage.setItem("user", JSON.stringify(action.payload.user));
            })

            // delete address
            .addCase(deleteAddressThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                localStorage.setItem("user", JSON.stringify(action.payload.user));
            })

            .addCase(loginThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as { message: string })?.message || null;
            })
    }
});

export const { clearUser } = authSlice.actions;
export default authSlice.reducer;