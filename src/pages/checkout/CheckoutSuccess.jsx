import React from "react";
import { Link } from "react-router-dom";
import "./CheckoutSuccess.scss";

const CheckoutSuccess = () => {
  return (
    <section>
      <div className={`container table`}>
        <h2>Checkout Successful</h2>

        <p>Thankyou for your purchase</p>
        <br />
        <Link
          className="--btn-small --bg-transparent view-order-status-btn"
          to="/order-history"
        >
          View Order Status
        </Link>
      </div>
    </section>
  );
};

export default CheckoutSuccess;
