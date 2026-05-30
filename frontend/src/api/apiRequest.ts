import type { Method } from "axios";
import api from "../services/axiosInstance";

interface ApiRequestProps {
    method: Method;
    url: string;
    data?: unknown;
    params?: Record<string, any>;
}

const apiRequest = async ({
    method,
    url,
    data,
    params,
}: ApiRequestProps) => {
    try {
        const res = await api({
            method,
            url,
            data,
            params,
        });

        return res.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || "Something went wrong"
        );
    }
};

export default apiRequest;