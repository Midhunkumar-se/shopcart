import React, { useEffect, useState } from "react";
import "./CheckoutForm.scss";
import CheckoutDetails from "../../pages/checkout/CheckoutDetails";
import CheckoutSummary from "../checkoutSummary/CheckoutSummary";
import master from "../../assets/logo/master.png";
import visa from "../../assets/logo/visa.png";
import rupay from "../../assets/logo/rupay.png";
import upi from "../../assets/logo/upi.png";
import { usePaymentInputs } from "react-payment-inputs";
import { useDispatch, useSelector } from "react-redux";
import {
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  CLEAR_CART,
  selectCartItems,
  selectCartTotalAmount,
} from "../../redux/slice/cartSlice";
import { selectShippingAddress } from "../../redux/slice/checkoutSlice";
import { toast } from "react-toastify";
import { selectEmail, selectUserID } from "../../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../firebase/config";
import { SmallLoader } from "../loader/Loader";

const CheckoutForm = () => {
  const [showPayment, setShowPayment] = useState("debitCard");
  const [isLoading, setIsLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState(null);
  const [expiryDate, setExpiryDate] = useState(null);
  const [cvc, setCvc] = useState(null);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const userID = useSelector(selectUserID);
  const userEmail = useSelector(selectEmail);
  const cartItems = useSelector(selectCartItems);
  const shippingAddress = useSelector(selectShippingAddress);
  const [coupon, setCoupon] = useState("GETOFFER");
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { meta, getCardNumberProps, getExpiryDateProps, getCVCProps } =
    usePaymentInputs();

  let discountAmount = (cartTotalAmount * 15) / 100;
  useEffect(() => {
    if (coupon === "GETOFFER") {
      setDiscount(discountAmount);
    } else {
      setDiscount(0);
    }
  }, [discountAmount, coupon]);

  let taxAmount = (cartTotalAmount * 10) / 100;
  useEffect(() => {
    setTax(taxAmount);
  }, [taxAmount]);

  const totalAmount = cartTotalAmount + tax - discount;

  function handleShow(e) {
    if (e.target.value === "cashOnDelivery") {
      setShowPayment("cashOnDelivery");
    }
    if (e.target.value === "upi") {
      setShowPayment("upi");
    }
    if (e.target.value === "debitCard") {
      setShowPayment("debitCard");
    }
  }

  function handleChangeCardNumber(e) {
    setCardNumber(e.target.value);
  }
  function handleChangeExpiryDate(e) {
    setExpiryDate(e.target.value);
  }
  function handleChangeCVC(e) {
    setCvc(e.target.value);
  }
  function handleCoupon(e) {
    setCoupon(e.target.value.toUpperCase());
  }
  function handleCloseOffer() {
    setCoupon("");
  }

  // Save order to Order History
  const saveOrder = async () => {
    const today = new Date();
    const date = today.toDateString();
    const time = today.toLocaleTimeString();
    const orderConfig = {
      userID,
      userEmail,
      orderDate: date,
      orderTime: time,
      orderAmount: totalAmount,
      orderStatus: "Order Placed...",
      cartItems,
      shippingAddress,
      createdAt: Timestamp.now().toDate(),
    };
    try {
      await addDoc(collection(db, "orders"), orderConfig);
      dispatch(CLEAR_CART());
      toast.success("Order saved");
      navigate("/checkout-success");
    } catch (error) {
      toast.error(error.message);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (!shippingAddress.name) {
      toast.error("Please enter the delivery information");
      return;
    }
    setIsLoading(true);

    if (showPayment === "debitCard" && !cardNumber && !expiryDate && !cvc) {
      toast.error("Please enter the payment information");
      setIsLoading(false);
      return;
    }

    if (cartItems.length <= 0) {
      toast.error("Please add items to ship");
      setIsLoading(false);
      return;
    }

    saveOrder();

    if (showPayment !== "cashOnDelivery") {
      toast.success("Payment successful");
    }
    setIsLoading(false);
  }

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [cartItems, dispatch]);

  return (
    <div className="container checkout">
      <div className="summary-delivery-info">
        <h3 style={{ marginBottom: "10px" }}>Checkout</h3>
        <div className="checkout-summary">
          <h4>Review Item And Shipping</h4>
          <CheckoutSummary />
        </div>
        <div className="delivery-info">
          <CheckoutDetails />
        </div>
      </div>
      <div className="orderSummary">
        <div className="orderSummary-wrap">
          <h4>Order Summary</h4>
          <div className="orderSummary__coupon">
            {coupon === "GETOFFER" ? (
              <div className="orderSummary__couponIsApplied">
                {" "}
                <span className="close" onClick={handleCloseOffer}>
                  X
                </span>{" "}
                <span className="getOffer">GETOFFER</span> is applied{" "}
              </div>
            ) : (
              ""
            )}
            <div className="orderSummary__coupon-input-wrap">
              <input
                onChange={handleCoupon}
                type="text"
                value={coupon}
                placeholder="Enter Coupon Code"
              />
            </div>
            {coupon !== "GETOFFER" && (
              <p style={{ color: "red", fontSize: "10px", marginLeft: "7px" }}>
                Enter valid coupon code
              </p>
            )}
          </div>
          <div className="orderSummary__payDetails">
            <p className="orderSummary__payDetails-title">Payment Details</p>
            <div className="orderSummary__payOptions">
              <div className="orderSummary__payOption">
                <input
                  type="radio"
                  name="cashOnDelivery"
                  value="cashOnDelivery"
                  onChange={handleShow}
                  checked={showPayment === "cashOnDelivery" ? true : false}
                />
                <p>Cash on Delivery</p>
              </div>
              <div className="orderSummary__payOption">
                <input
                  onChange={handleShow}
                  type="radio"
                  name="upi"
                  value="upi"
                  checked={showPayment === "upi" ? true : false}
                />
                <p>UPI</p>
              </div>
              <div className="orderSummary__payOption">
                <input
                  onChange={handleShow}
                  type="radio"
                  name="debitCard"
                  value="debitCard"
                  checked={showPayment === "debitCard" ? true : false}
                />
                <p>Credit or Debit card</p>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              {showPayment === "cashOnDelivery" && (
                <div className="orderSummary__cod">
                  <p>
                    Scan & Pay using Realtor app. Cash, UPI, Cards also
                    accepted. <span>Know more</span>
                  </p>
                </div>
              )}
              {showPayment === "upi" && (
                <div className="orderSummary__upi">
                  <div className="logo">
                    <img src={upi} alt="upi" />
                  </div>
                  <div className="orderSummary__form-control">
                    <div className="--form-control">
                      <label>Please enter your UPI ID</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: MobileNumber@upi"
                      />
                    </div>
                  </div>
                </div>
              )}
              {showPayment === "debitCard" && (
                <div className="orderSummary__debitCard">
                  <div className="logos">
                    <div className="logo">
                      <img src={master} alt="master" />
                    </div>
                    <div className="logo">
                      <img src={visa} alt="visa" />
                    </div>
                    <div className="logo">
                      <img src={rupay} alt="rupay" width="40px" />
                    </div>
                  </div>
                  <div className="orderSummary__form-wrap">
                    <div className="orderSummary__debit-form-wrap">
                      <div className="--form-control">
                        <label>Card Number*</label>
                        <input
                          {...getCardNumberProps({
                            onChange: handleChangeCardNumber,
                          })}
                          placeholder="Ex: 4242 4242 4242 4242"
                          required
                        />
                      </div>
                      <div className="orderSummary__flex">
                        <div className="--form-control">
                          <label>Expiry*</label>
                          <input
                            {...getExpiryDateProps({
                              onChange: handleChangeExpiryDate,
                            })}
                            placeholder="Ex: 02/36"
                            required
                          />
                        </div>
                        <div className="--form-control">
                          <label>CVC*</label>
                          <input
                            {...getCVCProps({ onChange: handleChangeCVC })}
                            placeholder="Ex: 123"
                            required
                          />
                        </div>
                      </div>
                      {meta.isTouched && meta.error && (
                        <span style={{ color: "red" }}>
                          Notification: {meta.error}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}
              <div className="orderSummary__totalAmount">
                <div className="orderSummary__subTotal">
                  <div className="key">Sub Total</div>
                  <div className="value">₹{cartTotalAmount.toFixed(2)}</div>
                </div>
                <div className="orderSummary__subTotal">
                  <div className="key">Tax(10%)</div>
                  <div className="value">₹{tax.toFixed(2)}</div>
                </div>
                <div className="orderSummary__subTotal">
                  <div className="key">Coupon Discount</div>
                  <div className="value">-₹{discount.toFixed(2)}</div>
                </div>
                <div className="orderSummary__subTotal">
                  <div className="key">Shipping Cost</div>
                  <div className="value">-₹0.00</div>
                </div>
                <div className="orderSummary__total">
                  <div className="total-key">Total</div>
                  <div className="total-value">₹{totalAmount.toFixed(2)}</div>
                </div>
              </div>
              {isLoading ? (
                <button
                  className="--btn --block"
                  disabled
                  style={{ background: "#6edd69", cursor: "default" }}
                >
                  <SmallLoader />
                </button>
              ) : (
                <button className="--btn --bg-green --block">
                  Pay ₹{totalAmount.toFixed(2)}
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
