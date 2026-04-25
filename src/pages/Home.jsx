import { Link } from 'react-router-dom';
import productsData from '../data/products.json';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const featuredProducts = [...productsData].reverse().slice(0, 4);

  return (
    <div className="bg-[#F5F5DC] min-h-screen">
      
      <div 
        className="relative bg-cover bg-center bg-no-repeat min-h-[75vh] flex items-center justify-center p-4 border-b-8 border-[#FFDAB9]"
        style={{ backgroundImage: `url('/bg.jpg')` }}
      >
        
        <div className="absolute inset-0 bg-[#F5F5DC]/40 backdrop-blur-[2px]"></div>
        
        <div className="relative z-10 text-center max-w-3xl p-10 bg-white/70 backdrop-blur-md rounded-3xl border border-[#FFDAB9] shadow-xl">
          <h1 className="text-5xl md:text-7xl font-bold text-[#6B8E23] mb-6 drop-shadow-sm">
            Welcome to Lootlo
          </h1>
          <p className="text-xl md:text-2xl text-[#333333] mb-10 font-bold drop-shadow-sm">
            Simple. Smart. Shopping.
          </p>
          <Link
            to="/shop"
            className="inline-block bg-[#6B8E23] text-[#F5F5DC] px-10 py-4 rounded-full text-lg font-bold hover:bg-[#556b2f] transition-all transform hover:scale-105 shadow-md shadow-[#6B8E23]/30"
          >
            Explore Shop
          </Link>
        </div>
      </div>

      
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#333333] mb-2">Featured Products</h2>
          <div className="w-24 h-1 bg-[#FFDAB9] mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
