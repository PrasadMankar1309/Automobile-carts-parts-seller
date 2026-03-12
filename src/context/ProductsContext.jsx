import { createContext, useContext, useState } from 'react';
import { PRODUCTS } from '../data';

const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(PRODUCTS);

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now(),
      tag: 'NEW',
      color: '#FFB400',
      items: [product.title],
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  return (
    <ProductsContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error('useProducts must be used within ProductsProvider');
  return ctx;
}
