import React from "react";
import "./discountNotification.css";

export const DiscountNotification = (props) => {
  return props.trigger ? (
    <div className="popup-message">
      <div className="popup-content">
        <button className="close-btn" onClick={() => props.setTrigger(false)}>
          close
        </button>
        <b>10% discount is applied</b>
      </div>
    </div>
  ) : (
    ""
  );
};
