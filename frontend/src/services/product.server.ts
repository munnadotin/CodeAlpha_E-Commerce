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

export const productBySlugServer = async (slug: string) => {
    const response = await apiRequest({
        method: "GET",
        url: `${ENDPOINTS.PRODUCTS.BY_ID}/${slug}`,
        data: {},
        params: {}
    })
    return response;
}

export const productByCategoryServer = async (category: string) => {
    const response = await apiRequest({
        method: "GET",
        url: `${ENDPOINTS.CATEGORIES.ALL}/${category}`,
        data: {},
        params: {}
    })
    return response;
}