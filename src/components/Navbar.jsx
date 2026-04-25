import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import SearchBar from './SearchBar';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-[#F5F5DC] shadow-sm sticky top-0 z-50 py-4 px-6 md:px-12">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        
        
        <Link to="/" className="text-2xl font-bold text-[#6B8E23] tracking-wide">
          Lootlo.
        </Link>

        <div className="hidden md:flex space-x-8">
          <Link to="/" className={`text-lg font-medium transition-colors ${isActive('/') ? 'text-[#6B8E23]' : 'text-[#333333] hover:text-[#6B8E23]'}`}>
            Home
          </Link>
          <Link to="/signup" className={`text-lg font-medium transition-colors ${isActive('/signup') ? 'text-[#6B8E23]' : 'text-[#333333] hover:text-[#6B8E23]'}`}>
            Sign Up
          </Link>
        </div>

        
        <div className="hidden lg:block flex-grow max-w-sm mx-8">
          <SearchBar />
        </div>

        
        <div className="flex items-center space-x-6">
          <button className="relative flex items-center text-[#333333] hover:text-[#6B8E23] transition-colors cursor-pointer">
            <Heart className="h-6 w-6" />
          </button>
          <button className="relative flex items-center text-[#333333] hover:text-[#6B8E23] transition-colors cursor-pointer">
            <ShoppingCart className="h-6 w-6" />
          </button>
        </div>

      </div>
    </nav>
  );
}
