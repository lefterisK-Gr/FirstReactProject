import React, { useContext } from "react";
import { ShopContext } from "../context/shop-context";

export const SidebarCartItem = (props) => {
  const { id, productName, price, productImage } = props.data;
  const { cartItems, addToCart, removeFromCart, updateCartItemCount } =
    useContext(ShopContext);

  return (
    <div className="sidebar-cartItem">
      <img src={productImage} />
      <div className="sidebar-description">
        <p>
          <b>{productName}</b>
        </p>
        <p>${price}</p>
        <div className="sidebar-countHandler">
          <button onClick={() => removeFromCart(id)}> - </button>
          <input
            data-testid="sidebar_cart-item"
            value={cartItems[id]}
            onChange={(e) => updateCartItemCount(Number(e.target.value), id)}
          />
          <button onClick={() => addToCart(id)}> + </button>
        </div>
      </div>
    </div>
  );
};
