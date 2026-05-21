import { useSelector } from "react-redux"
import type { RootState } from "../app/store"
import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute() {
    const { token } = useSelector((state: RootState) => state.auth);

    if (token) return <Navigate to={'/'} />

    return <Outlet />
}
