import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import SearchBar from './SearchBar';

export default function Navbar() {
  const { cartTotalItems } = useCart();
  const { wishlist } = useWishlist();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-[#F5F5DC] shadow-sm sticky top-0 z-50 py-4 px-6 md:px-12">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        
        {/* Logo Left */}
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

        {/* Search Bar */}
        <div className="hidden lg:block flex-grow max-w-sm mx-8">
          <SearchBar />
        </div>

        {/* Icons Right */}
        <div className="flex items-center space-x-6">
          <Link to="/wishlist" className="relative flex items-center text-[#333333] hover:text-[#6B8E23] transition-colors">
            <Heart className="h-6 w-6" />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#FFDAB9] text-[#333333] text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border border-[#F5F5DC]">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link to="/cart" className="relative flex items-center text-[#333333] hover:text-[#6B8E23] transition-colors">
            <ShoppingCart className="h-6 w-6" />
            {cartTotalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#6B8E23] text-[#F5F5DC] text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border border-[#F5F5DC]">
                {cartTotalItems}
              </span>
            )}
          </Link>
        </div>

      </div>
    </nav>
  );
}
