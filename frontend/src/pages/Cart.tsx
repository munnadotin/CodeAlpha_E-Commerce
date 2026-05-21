import { useSelector } from "react-redux"

const Cart = () => {

  const token = useSelector((state: any) => state.auth)
  console.log(token)
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-semibold">Cart</h1>
      <div>
        <p>Cart is empty</p>
      </div>
    </div>
  )
}

export default Cart