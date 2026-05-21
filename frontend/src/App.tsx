import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Layout from "./pages/Layout"
import Cart from "./pages/Cart"
import ProudectedRoute from "./routes/ProtectedRoute"

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/admin" element={
            <ProudectedRoute allowedRoles={['admin']}>
              <div>Admin</div>
            </ProudectedRoute>
          } />
          <Route index path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    </>
  )
}

export default App