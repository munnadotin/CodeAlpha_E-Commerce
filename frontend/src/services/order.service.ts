import apiRequest from "../api/apiRequest"
import { ENDPOINTS } from "../api/endpoints"

type UpdateOrderType = {
    paymentStatus?: "paid" | "pending"
    status?: "processing" | "shipped" | "delivered" | "cancelled"
}

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

// create order
export const createOrderService = async (paymentMethod: 'cod' | 'upi') => {
    const response = await apiRequest({
        method: "POST",
        url: ENDPOINTS.ORDER.CREATE,
        data: { paymentMethod },
        params: {}
    })
    return response
}

// get order by id
export const getOrderByIdService = async (orderId: string) => {
    const response = await apiRequest({
        method: "GET",
        url: `${ENDPOINTS.ORDER.CREATE}/${orderId}`,
        data: {},
        params: {}
    })
    return response
}

export const createCardOrderService = async (paymentMethod: 'upi' | 'cod') => {
    const response = await apiRequest({
        method: "POST",
        url: ENDPOINTS.ORDER.CREATE,
        data: { paymentMethod },
        params: {}
    })
    return response
}

// ================================ admin ====================================

export const getOrdersAdminService = async () => {
    const response = await apiRequest({
        method: "GET",
        url: ENDPOINTS.ORDER.ADMIN,
        data: {},
        params: {}
    })
    return response;
}

export const updateOrderById = async (orderId: string, data: UpdateOrderType) => {
    const response = await apiRequest({
        method: "PUT",
        url: `${ENDPOINTS.ORDER.CREATE}/${orderId}`,
        data,
        params: {}
    })
    return response;
}