import React, { createContext, useEffect, useState } from "react";
import { PRODUCTS } from "../products";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let i = 1; i < PRODUCTS.length + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};

export const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart()); // Use state needs array of 2 elements, one is the object and second function that updates it
  const [cartDiscount, setCartDiscount] = useState(false);
  const [cartDiscountPopup, setCartDiscountPopup] = useState(false);

  // useEffect to Save on Refresh
  useEffect(() => {
    const data = window.localStorage.getItem("CART_ITEMS");
    if (data !== null) setCartItems(JSON.parse(data));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("CART_ITEMS", JSON.stringify(cartItems));
  }, [cartItems]);

  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = PRODUCTS.find((product) => product.id === Number(item));
        totalAmount += cartItems[item] * itemInfo.price;
      }
    }

    totalAmount = applyDiscountIfNeeded(totalAmount);

    return totalAmount;
  };

  // Function to apply a discount if the total exceeds €100
  const applyDiscountIfNeeded = (totalPrice) => {
    if (cartDiscount) {
      totalPrice = totalPrice - totalPrice * 0.1;
    }
    setCartDiscount((prev) => {
      let updatedDiscount = prev;
      if (updatedDiscount) {
        if ((100 / 90) * totalPrice <= 100) {
          totalPrice = (100 / 90) * totalPrice;
          updatedDiscount = false;
        }
      } else {
        if (totalPrice > 100) {
          updatedDiscount = true;
          setCartDiscountPopup(true);
        }
      }
      return updatedDiscount;
    });
    return totalPrice;
  };

  const getNewJSONdata = () => {
    const newData = PRODUCTS.map((data) => {
      let tempData = { ...data }; // Copy object
      tempData.amount = cartItems[tempData.id]; // Set new field
      return tempData;
    });
    console.log(newData);
    return newData;
  };

  const addToCart = (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };

      // Check if the item already exists in the cart
      if (updatedCart.hasOwnProperty(itemId)) {
        // Increment the quantity if the item exists
        updatedCart[itemId] += 1;
      } else {
        // Create the item in the cart with a quantity of 1 if it doesn't exist
        updatedCart[itemId] = 1;
      }

      return updatedCart;
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };

      // Check if the item already exists in the cart
      if (updatedCart.hasOwnProperty(itemId)) {
        // Increment the quantity if the item exists
        updatedCart[itemId] -= 1;
      } else {
        // Create the item in the cart with a quantity of 1 if it doesn't exist
        updatedCart[itemId] = 1;
      }

      return updatedCart;
    });
  };

  const updateCartItemCount = (newAmount, itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };

      // Create the item in the cart with a quantity of 1 if it doesn't exist
      updatedCart[itemId] = newAmount;

      return updatedCart;
    });
  };

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItemCount,
    getTotalCartAmount,
    getNewJSONdata,
    cartDiscount,
    cartDiscountPopup,
    setCartDiscountPopup,
  };

  console.log(cartItems);

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
