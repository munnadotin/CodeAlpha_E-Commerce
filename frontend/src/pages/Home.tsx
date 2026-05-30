import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../app/store';
import { productThunk } from '../api/productThunk';
import { categoryThunk } from '../api/categoryThunk';
import { ArrowRight } from 'lucide-react';
import Loader from '../components/ui/Loader';

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading } = useSelector((state: RootState) => state.products);
  const { categories } = useSelector((state: RootState) => state.categories);

  useEffect(() => {
    dispatch(productThunk());
    dispatch(categoryThunk());
  }, []);

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

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-15 lg:py-22">
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
      <section className="max-w-7xl mx-auto px-4 py-24">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-gray-300"></span>
            <span className="text-xs font-medium tracking-wider text-gray-400 uppercase">Curated Selection</span>
            <span className="w-8 h-px bg-gray-300"></span>
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 tracking-tight">
            Shop by <span className="font-semibold">Category</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-md mx-auto">
            Discover excellence through our thoughtfully organized departments
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {categories.map((category) => (
            <Link
              key={category._id}
              to={`/products/category/${category.slug}`}
              className="group relative overflow-hidden bg-gray-50 aspect-4/5 transition-all duration-500"
            >
              {/* Image Container */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-center">
                {/* Minimalist accent line */}
                <div className="w-0 h-px bg-white/60 mb-4 transition-all duration-500 group-hover:w-12"></div>

                <h3 className="text-xl font-light tracking-wide text-white mb-1">
                  {category.name}
                </h3>

                {/* Subtle shop indicator */}
                <div className="opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  <span className="text-xs tracking-wider text-white/80 uppercase flex items-center gap-1">
                    Explore
                    <ArrowRight strokeWidth={1.5} size={14} />
                  </span>
                </div>
              </div>

              {/* Refined border on hover */}
              <div className="absolute inset-0 border border-white/0 group-hover:border-white/30 transition-all duration-500 pointer-events-none"></div>
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
          {/* <Link to="/products" className="text-gray-600 hover:text-gray-900 font-medium flex items-center gap-1 group">
            View All
            <ChevronRight strokeWidth={1.5} className='h-4 w-4 group-hover:translate-x-1 transition-transform' />
          </Link> */}
        </div>

        {loading ? <Loader /> : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;