import { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((product) => {
    setItems(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + (product.quantity || 1) } : i);
      }
      return [...prev, { ...product, qty: product.quantity || 1 }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id) => {
    setItems(prev => prev.filter(i => i.id !== id));
  }, []);

  const updateQty = useCallback((id, qty) => {
    if (qty < 1) { removeItem(id); return; }
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  }, [removeItem]);

  const toggleWishlist = useCallback((product) => {
    setWishlist(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) return prev.filter(i => i.id !== product.id);
      return [...prev, product];
    });
  }, []);

  const addToRecentlyViewed = useCallback((product) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(i => i.id !== product.id);
      return [product, ...filtered].slice(0, 10);
    });
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((s, i) => s + i.qty, 0);
  const totalAmount = items.reduce((s, i) => s + (i.qty * (i.id * 1245)), 0);

  return (
    <CartContext.Provider value={{
      items, cart: items, addItem, removeItem, updateQty, clearCart,
      wishlist, toggleWishlist,
      recentlyViewed, addToRecentlyViewed,
      isOpen, setIsOpen, totalItems, total: totalAmount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
