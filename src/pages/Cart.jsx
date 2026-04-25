import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

// Create a safe image loader component without relying on external CDNs
const CartItemImage = ({ src, alt }) => {
  const [hasError, setHasError] = useState(false);
  
  if (hasError) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-[#6B8E23] p-2">
        <svg className="w-8 h-8 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={alt} 
      onError={() => setHasError(true)}
      className="w-full h-full object-contain" 
    />
  );
};

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotalAmount } = useCart();

  if (cart.length === 0) {
    return (
      <div className="bg-[#F5F5DC] min-h-screen flex flex-col items-center justify-center p-4 text-center">
        <h2 className="text-3xl font-bold text-[#333333] mb-4">Your cart is empty</h2>
        <p className="text-[#333333] mb-8">Looks like you haven't added anything yet.</p>
        <Link
          to="/shop"
          className="bg-[#6B8E23] text-[#F5F5DC] px-8 py-3 rounded-full hover:bg-[#556b2f] transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F5DC] min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <h1 className="text-3xl font-bold text-[#333333]">Shopping Cart</h1>
          <div className="ml-4 px-3 py-1 bg-[#FFDAB9] text-[#6B8E23] rounded-full text-sm font-bold">
            {cart.length} Items
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-[#FFDAB9]">
          <ul className="divide-y divide-[#FFDAB9]">
            {cart.map((item) => (
              <li key={item.id} className="py-6 flex flex-col sm:flex-row gap-6">
                <div className="w-full sm:w-24 h-24 flex-shrink-0 bg-[#FFDAB9]/20 border border-[#FFDAB9] rounded-md p-2">
                  <CartItemImage src={item.image} alt={item.title} />
                </div>

                <div className="flex-1 flex flex-col">
                  <Link to={`/product/${item.id}`} className="text-lg font-medium text-[#333333] hover:text-[#6B8E23] mb-1">
                    {item.title}
                  </Link>
                  <p className="text-xl font-bold text-[#333333] mb-4">₹{(item.price * item.quantity).toFixed(2)}</p>
                  
                  <div className="flex items-center gap-6 mt-auto">
                    <div className="flex items-center border border-[#FFDAB9] rounded bg-[#FFDAB9]/10">
                      <button onClick={() => updateQuantity(item.id, -1)} className="px-3 py-1 hover:bg-[#FFDAB9] text-[#333333] font-bold">-</button>
                      <span className="px-3 py-1 text-[#333333] font-bold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="px-3 py-1 hover:bg-[#FFDAB9] text-[#333333] font-bold">+</button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-[#E11D48] hover:underline text-sm font-medium">
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-[#FFDAB9]">
          <h2 className="text-xl font-bold text-[#333333] mb-4">Summary</h2>
          <div className="flex justify-between mb-2">
            <span className="text-[#333333]">Subtotal</span>
            <span className="font-medium text-[#333333]">${cartTotalAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-4 pb-4 border-b border-[#FFDAB9]">
            <span className="text-[#333333]">Shipping</span>
            <span className="font-medium text-[#333333]">Free</span>
          </div>
          <div className="flex justify-between mb-6">
            <span className="text-xl font-bold text-[#333333]">Total</span>
            <span className="text-xl font-bold text-[#6B8E23]">${cartTotalAmount.toFixed(2)}</span>
          </div>
          <button className="w-full bg-[#6B8E23] text-[#F5F5DC] py-3 rounded-lg hover:bg-[#556b2f] transition-colors font-medium">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
