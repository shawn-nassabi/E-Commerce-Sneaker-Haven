'use client';

import { createContext, useState } from 'react';
import { useEffect } from 'react';

export const Context = createContext(null);

function createCartItem(item) {
  return {
    productType: item,
    count: 1,
  };
}

function GlobalState({ children }) {
  const [cartItems, setCartItems] = useState([]);

  function handleAddToCart(currentItem) {
    //console.log(currentItem._id);
    let cartCopy = [...cartItems];

    const indexOfCurrentItem = cartCopy.findIndex(
      (obj) => obj.productType._id === currentItem._id,
    );

    if (indexOfCurrentItem === -1) {
      // means that it isn't already in the cart
      //console.log('Item added to cart');
      cartCopy.push(createCartItem(currentItem));
    } else {
      //console.log('Item count in cart incremented');
      cartCopy[indexOfCurrentItem].count++;
    }
    alert('Added to cart');
    setCartItems(cartCopy);
    localStorage.setItem('cartItems', JSON.stringify(cartCopy));
  }

  function handleRemoveFromCart(currentId) {
    let cartCopy = [...cartItems];

    const indexOfCurrentItem = cartCopy.findIndex(
      (obj) => obj.productType._id === currentId,
    );

    if (cartCopy[indexOfCurrentItem].count > 1) {
      cartCopy[indexOfCurrentItem].count--;
    } else {
      cartCopy.splice(indexOfCurrentItem, 1);
    }
    alert('Removed from cart');
    setCartItems(cartCopy);
    localStorage.setItem('cartItems', JSON.stringify(cartCopy));
  }

  function handleCheckOut() {
    setCartItems([]);
    localStorage.setItem('cartItems', JSON.stringify([]));
    alert('Checkout complete');
  }

  useEffect(() => {
    setCartItems(JSON.parse(localStorage.getItem('cartItems')) || []);
  }, []);

  return (
    <Context.Provider
      value={{
        cartItems,
        handleAddToCart,
        handleRemoveFromCart,
        handleCheckOut,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default GlobalState;
