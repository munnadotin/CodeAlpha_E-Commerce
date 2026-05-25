import apiRequest from "../api/apiRequest"
import { ENDPOINTS } from "../api/endpoints"

// order history
export const getOrdersService = async () => {
    const response = await apiRequest({
        method: "GET",
        url: ENDPOINTS.ORDER.CREATE,
        data: {},
        params: {}
    })
    return response
}