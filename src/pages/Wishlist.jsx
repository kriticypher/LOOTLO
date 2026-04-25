import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';

export default function Wishlist() {
  const { wishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="bg-[#F5F5DC] min-h-screen flex flex-col items-center justify-center p-4">
        <Heart className="h-16 w-16 text-[#FFDAB9] mb-4" />
        <h2 className="text-2xl font-bold text-[#333333] mb-2">Your wishlist is empty</h2>
        <p className="text-[#333333] mb-6">Save items you love here.</p>
        <Link
          to="/shop"
          className="bg-[#6B8E23] text-[#F5F5DC] px-6 py-3 rounded-full hover:bg-[#556b2f] transition-colors"
        >
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F5DC] min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-[#333333] mb-8 flex items-center">
          <Heart className="h-6 w-6 text-[#E11D48] mr-2 fill-current" />
          My Wishlist
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
