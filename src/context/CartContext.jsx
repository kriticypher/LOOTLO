import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Basic local storage save
    const saved = localStorage.getItem('lootlo_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('lootlo_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    let message = "";
    let type = "success";

    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        message = "Increased quantity!";
        type = "info";
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      message = "Added to cart!";
      type = "success";
      return [...prev, { ...product, quantity: 1 }];
    });

    if (type === "success") toast.success(message);
    else toast.info(message);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    toast.error("Removed from cart");
  };

  const updateQuantity = (id, amount) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: Math.max(1, item.quantity + amount) };
        }
        return item;
      })
    );
  };

  const cartTotalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartTotalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartTotalAmount,
        cartTotalItems
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
