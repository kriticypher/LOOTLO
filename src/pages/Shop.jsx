import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import productsData from '../data/products.json';
import ProductCard from '../components/ProductCard';

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const categories = ['All', ...new Set(productsData.map(p => p.category))];

  const filteredProducts = useMemo(() => {
    let filtered = productsData;

    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery)
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery]);

  return (
    <div className="bg-[#F5F5DC] min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-[#333333] mb-8 text-center">Shop</h1>

        
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full font-medium transition-colors capitalize ${
                selectedCategory === cat
                  ? 'bg-[#6B8E23] text-[#F5F5DC]'
                  : 'bg-[#FFDAB9] text-[#333333] hover:bg-[#ffe5cc]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-[#333333]">
            <p className="text-xl">No products found {searchQuery ? `matching "${searchQuery}"` : 'in this category'}.</p>
          </div>
        )}
      </div>
    </div>
  );
}
