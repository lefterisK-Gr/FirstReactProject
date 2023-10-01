import React, { useContext } from "react";
import { PRODUCTS } from "../products";
import { ShopContext } from "../context/shop-context";
import { SidebarCartItem } from "./sidebar_cart-item";
import XMLExport from "./XMLExport";
import "./sidebar_cart.css";

import { useNavigate } from "react-router-dom";

export const SidebarCart = () => {
  const { cartItems, getTotalCartAmount, getNewJSONdata } =
    useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const xmlData = getNewJSONdata();

  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <div className="sidebar-cart">
        {totalAmount > 0 ? (
          <div className="sidebar-checkout">
            <p>Subtotal: ${totalAmount}</p>
            <button>Checkout</button>
            <XMLExport data={xmlData} />
          </div>
        ) : (
          <h1>Your Cart is Empty</h1>
        )}
        <div>
          <h1>Your Cart Items</h1>
        </div>
        <div className="sidebar-cartItems">
          {PRODUCTS.map((product) => {
            if (cartItems[product.id] !== 0) {
              return <SidebarCartItem data={product} />;
            }
          })}
        </div>
      </div>
    </div>
  );
};
