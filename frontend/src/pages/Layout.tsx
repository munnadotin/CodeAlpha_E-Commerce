import { Outlet } from "react-router-dom"
import Footer from "../components/layout/Footer"
import Navbar from "../components/layout/Navbar"

function Layout() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Layout