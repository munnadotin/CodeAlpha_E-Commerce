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
import SearchProduct from "./pages/SearchProduct"
import Checkout from "./pages/Checkout"
import OrderSuccess from "./pages/payment/OrderSuccess"
import OrderCancel from "./pages/payment/OrderCancel"

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
            <Route path="/products/search" element={<SearchProduct />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkout/order-success" element={<OrderSuccess />} />
            <Route path="/checkout/order-cancel" element={<OrderCancel />} />
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