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