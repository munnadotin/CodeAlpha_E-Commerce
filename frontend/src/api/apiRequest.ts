import api from "../services/axiosInstance"

const apiRequest = async ({
    method,
    url,
    data,
    params
}) => {
    try {
        const res = await api({
            method,
            url,
            data,
            params
        })
        return res.data
    } catch (error: any) {

        throw new Error(
            error.response?.data?.message ||
            "Something went wrong"
        );
    }
}

export default apiRequest