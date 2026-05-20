import { Handbag, HomeIcon, Search, User2 } from 'lucide-react';
import '../../App.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      {/* Desktop Navbar - Sticky Top */}
      <div className="hidden md:block w-full sticky top-0 z-50 border-b border-slate-300 bg-white shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 md:gap-12 p-4">
          {/* Logo */}
          <Link to={'/'} className="text-2xl font-normal tracking-wider text-gray-900 cursor-pointer">
            ALPHA<span className="font-light text-gray-500">STORE</span>
          </Link>

          {/* search & filter */}
          <div className="relative flex items-center border border-slate-300 shadow-xs rounded-md overflow-hidden bg-white">
            <select name="query" id="query" className="px-5 py-2.5 bg-transparent text-gray-700 text-sm border-r border-slate-300 cursor-pointer outline-none">
              <option value="all">All</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="home">Home</option>
            </select>
            <input type="text" className="w-72 px-5 py-2.5 text-gray-700 placeholder-slate-400 text-sm outline-none" placeholder="Search..." />
            <Search className="absolute h-5 w-5 right-2 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer" />
          </div>

          {/* action */}
          <div className="relative flex items-center gap-4">
            <button type='button' className='p-2 border border-slate-300 rounded-md shadow-xs cursor-pointer relative'>
              <Handbag strokeWidth={1.5} className='h-5 w-5' />
              <div className='absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>3</div>
            </button>
            <button className='flex items-center gap-2 px-4 py-1.5 border border-slate-300 rounded-md shadow-xs cursor-pointer'>
              <User2 strokeWidth={1.5} className='h-5 w-5' /> <span className='hidden lg:block'>Sign In / Register</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="block md:hidden w-full fixed bottom-0 z-50 border-t border-slate-300 bg-white shadow-xs">
        <div className="w-full flex items-center justify-around p-3">
          {/* Home */}
          <Link to="/" className="flex flex-col items-center gap-1 text-gray-600 hover:text-gray-900">
            <HomeIcon strokeWidth={1.5} className='h-5 w-5' />
            <span className="text-xs">Home</span>
          </Link>

          {/* Search */}
          <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-gray-900">
            <Search strokeWidth={1.5} className='h-5 w-5' />
            <span className="text-xs">Search</span>
          </button>

          {/* Cart */}
          <button className="relative flex flex-col items-center gap-1 text-gray-600 hover:text-gray-900">
            <Handbag strokeWidth={1.5} className='h-5 w-5' />
            <span className="text-xs">Cart</span>
            <div className='absolute -top-1 -right-2 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center'>0</div>
          </button>

          {/* Profile */}
          <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-gray-900">
            <User2 strokeWidth={1.5} className='h-5 w-5' />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>
    </>
  );
};


export default Navbar