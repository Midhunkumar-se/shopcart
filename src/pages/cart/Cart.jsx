import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  CLEAR_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  SAVE_URL,
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "../../redux/slice/cartSlice";
import "./Cart.scss";
import { FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";
import { selectIsLoggedIn } from "../../redux/slice/authSlice";

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const navigate = useNavigate();

  const increaseCart = (cart) => {
    dispatch(ADD_TO_CART(cart));
  };

  const decreaseCart = (cart) => {
    dispatch(DECREASE_CART(cart));
  };

  const removeFromCart = (cart) => {
    dispatch(REMOVE_FROM_CART(cart));
  };

  const clearCart = () => {
    dispatch(CLEAR_CART());
  };

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
    dispatch(SAVE_URL(""));
  }, [cartItems, dispatch]);

  const url = window.location.href;

  const checkout = () => {
    if (isLoggedIn) {
      navigate("/checkout");
    } else {
      dispatch(SAVE_URL(url));
      navigate("/login");
    }
  };

  return (
    <section>
      <div className={`container table cart-table`}>
        <h2>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <>
            <p>Your cart is currently empty.</p>
            <br />
            <div style={{ fontSize: "12px" }}>
              <Link to="/#products">&larr; Continue shopping</Link>
            </div>
          </>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((cart, index) => {
                  const { id, name, price, imageURL, cartQuantity } = cart;
                  return (
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td>
                        <p>
                          <b>{name}</b>
                        </p>
                        <img
                          className="disable"
                          src={imageURL}
                          alt={name}
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>
                        {price
                          .toString()
                          .replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ",")}
                      </td>
                      <td>
                        <div className="count">
                          <button
                            style={{ background: "none" }}
                            className="--btn"
                            onClick={() => decreaseCart(cart)}
                          >
                            -
                          </button>
                          <p>
                            <b>{cartQuantity}</b>
                          </p>
                          <button
                            style={{ background: "none" }}
                            className="--btn"
                            onClick={() => increaseCart(cart)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>
                        {(price * cartQuantity)
                          .toFixed(2)
                          .toString()
                          .replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ",")}
                      </td>
                      <td className="icons">
                        <FaTrashAlt
                          size={19}
                          color="red"
                          onClick={() => removeFromCart(cart)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="summary">
              <div className="summary-wrap">
                <button className="--btn-small --bg-green" onClick={clearCart}>
                  Clear Cart
                </button>
              </div>
              <div className="summary-checkout">
                <div>
                  <Link to="/#products" style={{ fontSize: "13px" }}>
                    &larr; Continue shopping
                  </Link>
                </div>

                <Card>
                  <p>
                    <b> {`Cart item(s): ${cartTotalQuantity}`}</b>
                  </p>
                  <div className="text">
                    <h4>Subtotal:</h4>
                    <h3>{`₹${cartTotalAmount
                      .toFixed(2)
                      .toString()
                      .replace(
                        /\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g,
                        ","
                      )}`}</h3>
                  </div>
                  <p>Tax and shipping calculated at checkout</p>
                  <button
                    className="--btn --btn-block --bg-green"
                    onClick={checkout}
                  >
                    Checkout
                  </button>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Cart;
