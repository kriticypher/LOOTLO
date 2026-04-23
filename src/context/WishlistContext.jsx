import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    // Load wishlist from local storage on initialization
    const savedWishlist = localStorage.getItem('lootlo_wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  useEffect(() => {
    // Save to local storage whenever wishlist changes
    localStorage.setItem('lootlo_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (product) => {
    const exists = wishlist.find((item) => item.id === product.id);
    
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      toast.info("Removed from Wishlist");
    } else {
      setWishlist((prev) => [...prev, product]);
      toast.success("Added to Wishlist ❤️", { icon: "❤️" });
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
