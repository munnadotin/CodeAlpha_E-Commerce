// pages/Home.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../app/store';
import { productThunk } from '../api/productThunk';
// import ProductCard from '../components/ProductCard';

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading } = useSelector((state: RootState) => state.products);
  const [trending, setTrending] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');

  // Sample product data (replace with API call)
  const sampleProducts = [
    {
      _id: "6a080210afb5b7b5d190a5d7",
      name: "BERIBES Bluetooth Headphones Over Ear, 65H Playtime and 6 EQ Music Modes Wireless Headphones with Microphone",
      price: 999,
      category: "electronics",
      images: [
        "https://ik.imagekit.io/xynzv73qi/71F2ccIPPLL._AC_SL1500__3JjetYQCX.jpg",
        "https://ik.imagekit.io/xynzv73qi/71JO-hF-X3L._AC_SL1500__3Cdk0GD7a.jpg",
        "https://ik.imagekit.io/xynzv73qi/71lf8pXs7ZL._AC_SL1500__5AKaHYW-4.jpg"
      ],
      stock: 40,
      ratings: 4.5
    }
  ];

  useEffect(() => {
    dispatch(productThunk());
  }, []);

  console.log(products);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative text-gray-900 overflow-hidden">
        {/* Abstract minimal shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gray-100 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-100 rounded-full blur-3xl opacity-60"></div>
        </div>

        {/* Subtle overlay pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_80%_50%_at_50%_50%,black_40%,transparent_100%)]"></div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-15 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="space-y-8">
              {/* Premium badge */}
              <div className="inline-flex items-center gap-2">
                <span className="w-8 h-px bg-gray-300"></span>
                <span className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Limited Edition
                </span>
              </div>

              {/* Heading */}
              <h1 className="text-5xl lg:text-7xl font-light leading-[1.1] tracking-tight">
                Define Your
                <span className="block font-semibold mt-2">Personal Aesthetic</span>
              </h1>

              {/* Description */}
              <p className="text-lg text-gray-500 leading-relaxed max-w-md">
                Curated collections from the world's finest brands. Where craftsmanship meets contemporary design.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <button className="group relative px-8 py-3.5 bg-gray-900 text-white text-sm font-medium tracking-wide overflow-hidden transition-all hover:bg-gray-800 cursor-pointer">
                  <span className="relative z-10">Explore Collection</span>
                </button>
                <button className="px-8 py-3.5 border border-gray-200 text-sm font-medium tracking-wide text-gray-700 transition-all hover:border-gray-400 hover:text-gray-900 cursor-pointer">
                  View Lookbook
                </button>
              </div>

              {/* Refined stats */}
              <div className="flex gap-12 pt-8">
                <div>
                  <div className="text-2xl font-semibold tracking-tight">200+</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">Designers</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold tracking-tight">15k</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">Clients</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold tracking-tight">28</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">Countries</div>
                </div>
              </div>
            </div>

            {/* Right image area */}
            <div className="relative lg:pl-8">
              <div className="relative aspect-4/5 overflow-hidden bg-gray-50">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                  alt="Premium collection"
                  className="w-full h-full object-cover grayscale-15"
                />
                {/* Minimalist frame accent */}
                <div className="absolute inset-0 border border-white/20 pointer-events-none"></div>
              </div>
              <div className="absolute -bottom-3 -right-3 w-24 h-24 bg-slate-50 lg:block"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900">Shop by <span className="font-semibold">Category</span></h2>
          <p className="text-gray-500 mt-2">Explore our curated collections</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { name: 'Electronics', icon: '💻', color: 'from-blue-500 to-cyan-500', bg: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500' },
            { name: 'Fashion', icon: '👕', color: 'from-pink-500 to-rose-500', bg: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=500' },
            { name: 'Home & Living', icon: '🏠', color: 'from-amber-500 to-orange-500', bg: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=500' },
            { name: 'Beauty', icon: '💄', color: 'from-purple-500 to-pink-500', bg: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500' }
          ].map((category, idx) => (
            <Link key={idx} to={`/category/${category.name.toLowerCase()}`} className="group relative overflow-hidden rounded-2xl shadow-lg h-48">
              <img src={category.bg} alt={category.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-80`}></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <span className="text-5xl mb-2">{category.icon}</span>
                <h3 className="text-xl font-bold">{category.name}</h3>
                <p className="text-sm opacity-90">Shop Now →</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Products Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900">Trending <span className="font-semibold">Now</span></h2>
            <p className="text-gray-500 mt-2">Most popular products this week</p>
          </div>
          <Link to="/trending" className="text-gray-600 hover:text-gray-900 font-medium flex items-center gap-1 group">
            View All
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl h-96 animate-pulse">
                <div className="h-64 bg-gray-200 rounded-t-2xl"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Flash Sale Banner */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="relative bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 px-8 py-12 md:py-16 text-center text-white">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4">
              <span className="text-yellow-300">⚡</span>
              <span className="text-sm font-medium">Flash Sale</span>
            </div>
            <h3 className="text-3xl md:text-5xl font-bold mb-4">Up to 70% Off</h3>
            <p className="text-lg mb-6">Limited time offer on selected items</p>

            {/* Countdown Timer */}
            <div className="flex justify-center gap-4 mb-8">
              {[
                { label: 'Days', value: '12' },
                { label: 'Hours', value: '08' },
                { label: 'Minutes', value: '45' },
                { label: 'Seconds', value: '22' }
              ].map((item, idx) => (
                <div key={idx} className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 min-w-[70px]">
                  <div className="text-2xl md:text-3xl font-bold">{item.value}</div>
                  <div className="text-xs opacity-90">{item.label}</div>
                </div>
              ))}
            </div>

            <Link to="/flash-sale" className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all">
              Grab Deals Now
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;