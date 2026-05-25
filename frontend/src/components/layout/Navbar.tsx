import { Handbag, HomeIcon, Search, User2, X } from 'lucide-react';
import '../../App.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../app/store';
import { useEffect, useState } from 'react';
import { cartThunk } from '../../api/cartThunk';

const Navbar = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { products } = useSelector((state: RootState) => state.cart);
  const { categories } = useSelector((state: RootState) => state.categories);
  const [query, setQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const disptach = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    disptach(cartThunk());
  }, [disptach]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSearch(false);
      setSearchQuery('');
      navigate(`/products/search?q=${searchQuery.trim()}`);
    }
  };

  return (
    <>
      {/* Desktop Navbar*/}
      <div className="hidden md:block w-full sticky top-0 z-50 border-b border-slate-300 bg-white shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 md:gap-12 p-4">
          {/* Logo */}
          <Link to={'/'} className="text-2xl font-normal tracking-wider text-gray-900 cursor-pointer">
            ALPHA<span className="font-light text-gray-500">STORE</span>
          </Link>

          {/* search & filter */}
          <div className="relative flex items-center border border-slate-300 shadow-xs rounded-md overflow-hidden bg-white">
            <select name="query" id="query" className="px-5 py-2.5 bg-transparent text-gray-700 text-sm border-r border-slate-300 cursor-pointer outline-none">
              {categories.map((category) => (
                <option
                  key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            <input
              onChange={(e) => setQuery(e.target.value)}
              name="query"
              type="text"
              className="w-72 px-5 py-2.5 text-gray-700 placeholder-slate-400 text-sm outline-none"
              placeholder="Search..."
            />
            <Search
              onClick={() => {
                if (query.trim() !== "") {
                  navigate(`/products/search?q=${query}`)
                  setQuery("");
                }
              }}
              type='button'
              className="absolute h-5 w-5 right-2 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer" />
          </div>

          {/* action */}
          <div className="relative flex items-center gap-4">
            <button onClick={() => navigate('/cart')} type='button' className='p-2 border border-slate-300 rounded-md shadow-xs cursor-pointer relative'>
              <Handbag strokeWidth={1.5} className='h-5 w-5' />
              <div className='absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>{products?.items?.length || 0}</div>
            </button>
            {user ? (
              <button onClick={() => navigate('/profile')} className='flex items-center gap-2 px-4 py-1.5 border border-slate-300 rounded-md shadow-xs cursor-pointer'>
                <User2 strokeWidth={1.5} className='h-5 w-5' /> <span className='hidden lg:block'>Profile</span>
              </button>
            ) : (
              <button onClick={() => navigate('/login')} className='flex items-center gap-2 px-4 py-1.5 border border-slate-300 rounded-md shadow-xs cursor-pointer'>
                <User2 strokeWidth={1.5} className='h-5 w-5' /> <span className='hidden lg:block'>Sign In / Register</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="block md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex items-center justify-around px-4 py-2">
          {/* Home */}
          <Link
            to="/"
            className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-900 transition-colors"
          >
            <HomeIcon strokeWidth={1.5} className="h-5 w-5" />
            <span className="text-xs">Home</span>
          </Link>

          {/* Search */}
          <button
            onClick={() => setShowSearch(true)}
            className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
          >
            <Search strokeWidth={1.5} className="h-5 w-5" />
            <span className="text-xs">Search</span>
          </button>

          {/* Cart */}
          <button
            onClick={() => navigate('/cart')}
            className="relative flex flex-col items-center gap-1 text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
          >
            <Handbag strokeWidth={1.5} className="h-5 w-5" />
            <span className="text-xs">Cart</span>
            {(products?.items?.length > 0) && (
              <div className="absolute -top-1 -right-2 bg-gray-900 text-white text-[10px] font-medium rounded-full min-w-4 h-4 px-1 flex items-center justify-center">
                {products.items.length}
              </div>
            )}
          </button>

          {/* Profile / Login */}
          {user ? (
            <button
              onClick={() => navigate('/profile')}
              className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
            >
              <User2 strokeWidth={1.5} className="h-5 w-5" />
              <span className="text-xs">Profile</span>
            </button>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
            >
              <User2 strokeWidth={1.5} className="h-5 w-5" />
              <span className="text-xs">Login</span>
            </button>
          )}
        </div>
      </div>

      {/* Search Modal */}
      {showSearch && (
        <div className="fixed inset-0 z-50 bg-white/95 backdrop-blur-sm md:hidden">
          <div className="p-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900">Search Products</h3>
              <button
                onClick={() => {
                  setShowSearch(false);
                  setSearchQuery('');
                }}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Search Form */}
            <form onSubmit={handleSearch}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-gray-400 transition-colors text-gray-900 placeholder:text-gray-400"
                autoFocus
              />
              <button
                type="submit"
                className="w-full mt-4 bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Search
              </button>
            </form>

            {/* Popular Searches */}
            <div className="mt-8">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">Popular Searches</p>
              <div className="flex flex-wrap gap-2">
                {['electronics', 'fashion', 'shoes', 'mobile', 'laptop'].map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setSearchQuery(term);
                      navigate(`/products/search?q=${term}`);
                      setShowSearch(false);
                    }}
                    className="px-3 py-1.5 bg-gray-100 text-sm text-gray-600 rounded-full hover:bg-gray-200 hover:text-gray-900 transition"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


export default Navbar