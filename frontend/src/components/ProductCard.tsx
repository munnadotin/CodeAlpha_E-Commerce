import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';

const ProductCard = ({ product }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);

    return (
        <div
            className="group relative border border-slate-300 rounded-2xl overflow-hidden shadow-sm transition-all duration-500"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img
                    src={product.images[currentImage]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Quick View Button */}
                <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                    <Link to={`/product/${product.slug}`} className="bg-white text-gray-900 px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-900 hover:text-white transition-all transform translate-y-2 group-hover:translate-y-0 cursor-pointer">
                        Quick View
                    </Link>
                </div>

                {/* Image Navigation Dots */}
                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1">
                    {product.images.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentImage(idx)}
                            className={`w-1.5 h-1.5 rounded-full transition-all ${currentImage === idx ? 'bg-white w-3' : 'bg-white/50'} cursor-pointer`}
                        />
                    ))}
                </div>
            </div>

            {/* Product Info */}
            <div className="p-4">
                <div className="mb-2">
                    <p className="text-xs text-gray-500 uppercase tracking-wider">{product.category}</p>
                    <Link to={`/product/${product.slug}`}>
                        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-gray-600 transition-colors mt-1">
                            {product.name}
                        </h3>
                    </Link>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
                    {/* <span className="text-sm text-gray-400 line-through">₹{Math.round(product.price * 1.25)}</span>
                    <span className="text-xs text-green-600 font-medium">Save 25%</span> */}
                </div>

                {/* Add to Cart Button */}
                <button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2.5 rounded text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer">
                    <ShoppingCart strokeWidth={1.5} className='h-5 w-5' />
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;