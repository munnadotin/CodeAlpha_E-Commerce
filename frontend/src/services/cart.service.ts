import apiRequest from "../api/apiRequest"
import { ENDPOINTS } from "../api/endpoints"

export const getCartItems = async () => {
    const response = await apiRequest({
        method: "GET",
        url: ENDPOINTS.CART.ALL,
        data: {},
        params: {}
    })
    return response;
}

export const addCartItem = async (productId: string, quantity: number) => {
    const response = await apiRequest({
        method: "POST",
        url: ENDPOINTS.CART.ALL,
        data: {
            productId,
            quantity
        },
        params: {}
    })
    return response;
}

export const updateCartItem = async (cartItemId: string, action: string) => {
    const response = await apiRequest({
        method: "PUT",
        url: `${ENDPOINTS.CART.ALL}/${cartItemId}`,
        data: {
            action
        },
        params: {}
    })
    return response;
}

export const removeCartItem = async (cartItemId: string) => {
    const response = await apiRequest({
        method: "DELETE",
        url: `${ENDPOINTS.CART.ALL}/${cartItemId}`,
        data: {},
        params: {}
    })
    return response;
}