import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { toast } from 'react-toastify';
import productsData from '../data/products.json';
import { useState } from 'react';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const product = productsData.find(p => p.id === parseInt(id));
  
  if (!product) {
    return (
      <div className="bg-[#F5F5DC] min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-[#333333] mb-4">Product not found</h2>
        <Link to="/shop" className="text-[#6B8E23] hover:underline">
          Return to Shop
        </Link>
      </div>
    );
  }

  const [hasError, setHasError] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);

  const toggleWishlist = () => {
    setInWishlist(!inWishlist);
  };

  return (
    <div className="bg-[#F5F5DC] min-h-screen py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="text-[#333333] hover:text-[#6B8E23] mb-8 font-medium transition-colors"
        >
          &larr; Back
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-[#FFDAB9] overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            
            
            <div className="p-8 bg-white flex items-center justify-center relative border-r border-[#FFDAB9]">
              <button 
                onClick={toggleWishlist}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#F5F5DC] transition-colors z-10"
              >
                <Heart className={`h-6 w-6 ${inWishlist ? 'text-[#E11D48] fill-current' : 'text-[#333333]'}`} />
              </button>
              {!hasError ? (
                <img 
                  src={product.image} 
                  alt={product.title} 
                  onError={() => setHasError(true)}
                  className="w-full h-80 object-contain"
                />
              ) : (
                <div className="w-full h-80 flex flex-col items-center justify-center text-[#6B8E23]">
                   <svg className="w-20 h-20 mb-4 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                   <span className="font-semibold px-4 text-center">Failed to load preview image in your network</span>
                </div>
              )}
            </div>

            
            <div className="p-8 lg:p-12 flex flex-col bg-[#FFDAB9]/10">
              <span className="text-sm font-semibold tracking-wide text-[#6B8E23] uppercase mb-2">
                {product.category}
              </span>
              <h1 className="text-3xl font-bold text-[#333333] mb-4">
                {product.title}
              </h1>
              
              <div className="text-2xl font-bold text-[#333333] mb-6">
                ₹{product.price.toFixed(2)}
              </div>

              <p className="text-[#333333] leading-relaxed mb-8 flex-grow">
                {product.description}
              </p>

              <button
                onClick={() => toast.success('Added to static cart!')}
                className="w-full py-4 text-lg font-medium text-[#F5F5DC] bg-[#6B8E23] rounded-lg hover:bg-[#556b2f] transition-colors shadow-sm"
              >
                Add to Cart
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
