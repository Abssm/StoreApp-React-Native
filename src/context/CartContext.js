import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  // =========================
  // 1) CART ITEMS
  // =========================
  const [items, setItems] = useState([]); // [{id,title,price,image,qty}]

  const addToCart = (product) => {
    setItems((prev) => {
      const found = prev.find((x) => x.id === product.id);

      // If already in cart -> increase qty
      if (found) {
        return prev.map((x) =>
          x.id === product.id ? { ...x, qty: x.qty + 1 } : x
        );
      }

      // If not -> add new item
      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.images?.[0],
          qty: 1,
        },
      ];
    });
  };

  const incQty = (id) => {
    setItems((prev) =>
      prev.map((x) => (x.id === id ? { ...x, qty: x.qty + 1 } : x))
    );
  };

  const decQty = (id) => {
    setItems((prev) =>
      prev
        .map((x) => (x.id === id ? { ...x, qty: x.qty - 1 } : x))
        .filter((x) => x.qty > 0)
    );
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((x) => x.id !== id));
  };

  // =========================
  // 2) ADDRESSES
  // =========================
  const [addresses, setAddresses] = useState([]); // [{id, name, country, city, phone, addressLine, primary}]
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const addAddress = (address) => {
    const id = Date.now().toString(); // simple unique id
    setAddresses((prev) => [...prev, { id, ...address }]);
    setSelectedAddressId(id); // auto select newest
  };

  const selectAddress = (id) => setSelectedAddressId(id);

  const removeAddress = (id) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    setSelectedAddressId((prev) => (prev === id ? null : prev));
  };

  const selectedAddress =
    addresses.find((a) => a.id === selectedAddressId) || null;

  // =========================
  // 3) CARDS (Payment)
  // =========================
  const [cards, setCards] = useState([]); // [{id, owner, number, exp, cvv, saveInfo}]
  const [selectedCardId, setSelectedCardId] = useState(null);

  const addCard = (card) => {
    const id = Date.now().toString(); // simple unique id
    setCards((prev) => [...prev, { id, ...card }]);
    setSelectedCardId(id); // auto select newest
  };

  const selectCard = (id) => setSelectedCardId(id);

  const removeCard = (id) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
    setSelectedCardId((prev) => (prev === id ? null : prev));
  };

  const selectedCard = cards.find((c) => c.id === selectedCardId) || null;

  return (
    <CartContext.Provider
      value={{
        // cart
        items,
        addToCart,
        incQty,
        decQty,
        removeItem,

        // addresses
        addresses,
        selectedAddressId,
        selectedAddress,
        addAddress,
        selectAddress,
        removeAddress,

        // cards
        cards,
        selectedCardId,
        selectedCard,
        addCard,
        selectCard,
        removeCard,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
