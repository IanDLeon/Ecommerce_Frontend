import React, { createContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (selectedProduct, quantity = 1) => {
    let isProduct = cart.find((product) => product.id === selectedProduct.id);
    !isProduct && setCart([...cart, { ...selectedProduct, quantity }]);
  };

  const increaseProductQuantity = (productId) => {
    setCart(
      cart.map((product) =>
        product.id === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  const decreaseProductQuantity = (productId) => {
    setCart(
      cart.map((product) =>
        product.id === productId
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  const removeCartItem = (productId) => {
    setCart(cart.filter((product) => product.id !== productId));
  };

  const clearCartItems = () => {
    setCart([]);
    localStorage.removeItem("cart")
  };

  useEffect(() => {
    if(cart.length) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart])

  useEffect(() => {
    if(localStorage.getItem("cart")) {
      setCart(JSON.parse(localStorage.getItem("cart")));
    }
  }, [])

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeCartItem,
        increaseProductQuantity,
        decreaseProductQuantity,
        clearCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
