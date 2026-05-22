import apiRequest from "../api/apiRequest"
import { ENDPOINTS } from "../api/endpoints";
import type { LoginCredentials, RegisterCredentials } from "../types/auth.type"

export const loginUser = async (data: LoginCredentials) => {
    const response = await apiRequest({
        method: "POST",
        url: ENDPOINTS.AUTH.LOGIN,
        data: data,
        params: {}
    })
    return response;
}

export const registerUser = async (data: RegisterCredentials) => {
    const response = await apiRequest({
        method: "POST",
        url: ENDPOINTS.AUTH.REGISTER,
        data: data,
        params: {}
    })
    return response;
}