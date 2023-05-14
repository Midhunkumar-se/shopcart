import React from "react";
import "./CheckoutSummary.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCartItems } from "../../redux/slice/cartSlice";
import "./CheckoutSummary.scss";

const CheckoutSummary = () => {
  const cartItems = useSelector(selectCartItems);

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {cartItems.lenght === 0 ? (
          <>
            <p>No item in your cart.</p>
            <button className="--btn-small --bg-green">
              <Link to="/#products">Back To Shop</Link>
            </button>
          </>
        ) : (
          <div>
            {cartItems.map((item, index) => {
              const { id, name, price, cartQuantity, imageURL } = item;
              return (
                <div className="cart-item" key={id}>
                  <div className="cart-item__wrap-img">
                    <div className="cart-item__img">
                      {" "}
                      <img src={imageURL} alt="" />{" "}
                    </div>
                    <div className="cart-item__name">{name}</div>
                  </div>
                  <div className="cart-item__quantity-price">
                    {" "}
                    <p className="cart-item__price">
                      ₹
                      {price
                        .toFixed(2)
                        .toString()
                        .replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ",")}
                    </p>
                    <p className="cart-item__quantity">
                      Quantity: {cartQuantity}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutSummary;
