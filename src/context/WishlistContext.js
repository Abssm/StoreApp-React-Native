import React, { createContext, useContext, useState } from 'react';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]); // [{id,title,price,image}]

  const isInWishlist = (id) => wishlist.some((x) => x.id === id);

  const addToWishlist = (product) => {
    if (!product?.id) return;

    setWishlist((prev) => {
      const found = prev.some((x) => x.id === product.id);
      if (found) return prev;

      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.images?.[0],
        },
      ];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((x) => x.id !== id));
  };

  const toggleWishlist = (product) => {
    if (!product?.id) return;

    setWishlist((prev) => {
      const found = prev.some((x) => x.id === product.id);
      if (found) return prev.filter((x) => x.id !== product.id);

      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.images?.[0],
        },
      ];
    });
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        isInWishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
