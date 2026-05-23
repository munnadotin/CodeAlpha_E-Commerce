import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Layout from "./pages/Layout"
import Cart from "./pages/Cart"
import ProudectedRoute from "./routes/ProtectedRoute"
import PublicRoute from "./routes/PublicRoute"
import Ordres from "./pages/admin/Ordres"
import Profile from "./pages/Profile"
import { Toaster } from "react-hot-toast"
import ProductDetail from "./components/ProductDetails"
import Products from "./pages/Products"

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/admin" element={
            <ProudectedRoute allowedRoles={['admin']} />
          }>
            <Route path="ordres" element={<Ordres />} />
          </Route>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<ProudectedRoute allowedRoles={["user"]} />}>
            <Route index path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:slug" element={<ProductDetail />} />
            <Route path="/products/category/:slug" element={<Products />} />
          </Route>
          <Route element={<ProudectedRoute allowedRoles={["user", "admin"]} />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App