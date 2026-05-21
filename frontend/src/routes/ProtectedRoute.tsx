import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { Navigate, Outlet } from "react-router-dom";

export default function ProudectedRoute({ allowedRoles }: { allowedRoles: string[] }) {
    const { user, token } = useSelector((state: RootState) => state.auth);

    if (!token) {
        return <Navigate to={'/login'} />
    }

    if (allowedRoles && !allowedRoles.includes(user?.role)) {
        return <Navigate to={'/'} />
    }

    return <Outlet />;
}
