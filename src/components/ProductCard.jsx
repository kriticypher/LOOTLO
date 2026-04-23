import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useState } from 'react';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col group relative overflow-hidden">
      
      {/* Wishlist Icon */}
      <button 
        onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
        className="absolute top-3 right-3 z-10 p-2 rounded-full hover:bg-[#F5F5DC] transition-colors"
      >
        <Heart 
          className={`h-5 w-5 transition-colors ${inWishlist ? 'text-[#E11D48] fill-current' : 'text-[#333333]'}`} 
        />
      </button>

      {/* Image */}
      <Link to={`/product/${product.id}`} className="block relative pt-[100%] bg-white border-b border-[#F5F5DC]">
        {!hasError ? (
          <img
            src={product.image}
            alt={product.title}
            onError={() => setHasError(true)}
            className="absolute inset-0 w-full h-full object-contain p-6 transform group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#FFDAB9]/10 text-[#6B8E23]">
             <svg className="w-12 h-12 mb-2 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
             <span className="text-xs font-semibold px-4 text-center">Preview Unavailable</span>
          </div>
        )}
      </Link>
      
      {/* Content */}
      <div className="p-4 flex flex-col flex-grow bg-[#FFDAB9]/10">
        <Link to={`/product/${product.id}`} className="block flex-grow mb-2">
          <h3 className="text-[#333333] font-medium line-clamp-2 hover:text-[#6B8E23] transition-colors">
            {product.title}
          </h3>
        </Link>
        
        <div className="mt-auto flex flex-col gap-3">
          <span className="text-xl font-bold text-[#333333]">
            ₹{product.price.toFixed(2)}
          </span>
          <button
            onClick={() => addToCart(product)}
            className="w-full bg-[#6B8E23] text-[#F5F5DC] py-2 rounded-md hover:bg-[#556b2f] transition-colors font-medium shadow-sm hover:shadow"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
