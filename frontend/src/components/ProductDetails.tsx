import { useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Sample product (replace with API call)
  const product = {
    _id: "6a080210afb5b7b5d190a5d7",
    name: "BERIBES Bluetooth Headphones Over Ear, 65H Playtime and 6 EQ Music Modes Wireless Headphones with Microphone",
    price: 999,
    category: "electronics",
    description: "65 Hours Playtime: Low power consumption technology applied, BERIBES bluetooth headphones with built-in 500mAh battery can continually play more than 65 hours...",
    images: [
      "https://ik.imagekit.io/xynzv73qi/71F2ccIPPLL._AC_SL1500__3JjetYQCX.jpg",
      "https://ik.imagekit.io/xynzv73qi/71JO-hF-X3L._AC_SL1500__3Cdk0GD7a.jpg",
      "https://ik.imagekit.io/xynzv73qi/71lf8pXs7ZL._AC_SL1500__5AKaHYW-4.jpg"
    ],
    stock: 40,
    ratings: 4.5
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Product Images */}
        <div>
          <div className="bg-white rounded-2xl overflow-hidden mb-4 shadow-sm">
            <img 
              src={product.images[selectedImage]} 
              alt={product.name}
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`rounded-lg overflow-hidden border-2 transition-all ${selectedImage === idx ? 'border-gray-900' : 'border-transparent'}`}
              >
                <img src={img} alt={`View ${idx + 1}`} className="w-full h-24 object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">{product.category}</p>
          <h1 className="text-3xl font-semibold text-gray-900 mb-4">{product.name}</h1>
          
          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-500">({product.ratings} reviews)</span>
            <span className="text-green-600 text-sm font-medium">In Stock</span>
          </div>

          {/* Price */}
          <div className="mb-6">
            <span className="text-4xl font-bold text-gray-900">₹{product.price}</span>
            <span className="text-lg text-gray-400 line-through ml-2">₹{Math.round(product.price * 1.25)}</span>
            <span className="text-green-600 text-sm ml-2">Save 25%</span>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
            <div className="flex items-center gap-3 border border-gray-200 rounded-lg w-32">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="flex-1 py-2 hover:bg-gray-50 transition-colors"
              >
                -
              </button>
              <span className="flex-1 text-center font-medium">{quantity}</span>
              <button 
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="flex-1 py-2 hover:bg-gray-50 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="flex gap-3">
            <button className="flex-1 bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6M17 13l1.5 6M9 21h6M12 15v6" />
              </svg>
              Add to Cart
            </button>
            <button className="px-6 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;