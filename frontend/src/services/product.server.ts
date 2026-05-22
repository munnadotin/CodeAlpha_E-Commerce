import apiRequest from "../api/apiRequest"
import { ENDPOINTS } from "../api/endpoints"

export const productServer = async () => {
    const response = await apiRequest({
        method: "GET", 
        url: ENDPOINTS.PRODUCTS.ALL, 
        data: {},
        params: {}
    })
    return response;
}
