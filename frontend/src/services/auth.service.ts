import apiRequest from "../api/apiRequest"
import { ENDPOINTS } from "../api/endpoints";
import type { Address, LoginCredentials, RegisterCredentials } from "../types/auth.type"

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

export const addAddress = async (data: Address) => {
    const response = await apiRequest({
        method: "POST",
        url: ENDPOINTS.AUTH.ADD_ADDRESS,
        data: data,
        params: {}
    })
    return response;
}

export const updateAddress = async (data: Address, addressId: string) => {
    const response = await apiRequest({
        method: "PATCH", 
        url: `${ENDPOINTS.AUTH.UPDATE_ADDRESS}/${addressId}`, 
        data: data,
        params: {}
    })
    return response;
}

export const deleteAddress = async (addressId: string) => {
    const response = await apiRequest({
        method: "DELETE" ,
        url: `${ENDPOINTS.AUTH.DELETE_ADDRESS}/${addressId}`, 
        data: {},
        params: {}
    })
    return response;
}