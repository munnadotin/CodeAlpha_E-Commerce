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

export const searchProduct = async (query: string) => {
    const response = await apiRequest({
        method: "GET",
        url: `${ENDPOINTS.PRODUCTS.SERACH}?query=${query}`,
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

export const createProductServer = async (data: FormData) => {
    const response = await apiRequest({
        method: "POST",
        url: ENDPOINTS.PRODUCTS.CREATE,
        data: data,
        params: {}
    })
    return response;
}

export const updateProductServer = async (productId: string, data: FormData) => {
    const response = await apiRequest({
        method: "PATCH",
        url: `${ENDPOINTS.PRODUCTS.BY_ID}/${productId}`,
        data: data,
        params: {}
    })
    return response;
}


export const deleteProductServer = async (productId: string) => {
    const response = await apiRequest({
        method: "DELETE",
        url: `${ENDPOINTS.PRODUCTS.BY_ID}/${productId}`,
        data: {},
        params: {}
    })
    return response;
}
