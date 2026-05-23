import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import type { AppDispatch, RootState } from '../app/store';
import { productByIdThunk } from '../api/productThunk';
import { Minus, Plus, ShoppingCart } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const dispatch = useDispatch<AppDispatch>();
  const { loading, productDetails } = useSelector((state: RootState) => state.products);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(productByIdThunk(id!));
  }, [id])

  if (!productDetails) {
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div>
          <div className="bg-white rounded-2xl overflow-hidden mb-4 w-full h-75 md:h-125">
            <img
              src={productDetails?.images[selectedImage]}
              alt={productDetails?.name}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {productDetails?.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`rounded overflow-hidden border-2 transition-all ${selectedImage === idx ? 'border-gray-900' : 'border-transparent'} cursor-pointer`}
              >
                <img src={img} alt={`View ${idx + 1}`} className="w-full h-24 object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">{productDetails?.category}</p>
          <h1 className="text-3xl font-semibold text-gray-900 mb-4">{productDetails?.name}</h1>

          {/* Stock */}
          <div className="flex flex-col gap-2 mb-4">
            <span className="text-green-600 text-sm font-medium">In Stock</span>
            <span className="text-gray-800 text-sm">({productDetails?.stock} available)</span>
          </div>

          {/* Price */}
          <div className="mb-6">
            <span className="text-4xl font-bold text-gray-900">₹{productDetails?.price}</span>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-600 text-xs leading-relaxed">{productDetails?.description}</p>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
            <div className="flex items-center gap-3 border border-gray-200 rounded-lg w-32">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="flex-1 flex items-center justify-center py-2 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
              >
                <Minus strokeWidth={1.5} className="h-4 w-4" />
              </button>
              <span className="flex-1 text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(productDetails?.stock || 0, quantity + 1))}
                className="flex-1 flex items-center justify-center py-2 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
              >
                <Plus strokeWidth={1.5} className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="flex gap-3">
            <button className="flex-1 bg-gray-900 text-white py-3 rounded font-semibold hover:bg-gray-800 transition-all flex items-center justify-center gap-2 cursor-pointer">
              <ShoppingCart strokeWidth={1.5} className="h-5 w-5" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;