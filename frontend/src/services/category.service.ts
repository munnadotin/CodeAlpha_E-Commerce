import apiRequest from "../api/apiRequest"
import { ENDPOINTS } from "../api/endpoints"

export const getCategory = async () => {
    const response = await apiRequest({
        method: "GET",
        url: ENDPOINTS.CATEGORIES.ALL,
        data: {},
        params: {}
    })
    return response;
}