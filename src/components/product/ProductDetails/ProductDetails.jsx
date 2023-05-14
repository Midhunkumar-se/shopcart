import "./ProductDetails.scss";

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Loader from "../../loader/Loader";

import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
  DECREASE_CART,
  selectCartItems,
} from "../../../redux/slice/cartSlice";
import useFetchDocument from "../../../customHooks/useFetchDocument";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import Card from "../../card/Card";
import StarsRating from "react-star-rate";
import { BsTruck } from "react-icons/bs";
import { CiMemoPad } from "react-icons/ci";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const { document } = useFetchDocument("products", id);
  const { data } = useFetchCollection("reviews");
  const filteredReviews = data.filter((review) => review.productID === id);

  const cart = cartItems.find((cart) => cart.id === id);
  const isCartAdded = cartItems.findIndex((cart) => {
    return cart.id === id;
  });

  useEffect(() => {
    setProduct(document);
  }, [document]);

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  const decreaseCart = (product) => {
    dispatch(DECREASE_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  const capitalizeFirstLowercaseRest = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  return (
    <section>
      <div className="product-detail">
        <h2>Product Details</h2>
        <div>
          <Link to="/#products">&larr; Back To Products</Link>
        </div>
        {product === null ? (
          <Loader />
        ) : (
          <>
            <div className="product-details">
              <div className="product-details__img">
                <img src={product.imageURL} alt={product.name} />
              </div>
              <div className="product-details__content">
                <h3>{capitalizeFirstLowercaseRest(product.name)}</h3>
                <p className="product-details__description">{product.desc}</p>
                <p className="product-details__price">
                  {`₹${product.price
                    .toFixed(2)
                    .toString()
                    .replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ",")}`}{" "}
                  or {`${(product.price / 6).toFixed(2)}/month`}
                  <p>Suggested payents with 6 months special financing</p>
                </p>

                <p className="product-details__brand">
                  <b>Brand</b> {capitalizeFirstLowercaseRest(product.brand)}
                </p>
                <div className="count">
                  {isCartAdded < 0 ? null : (
                    <div className="product-details__incDec-btn">
                      <button onClick={() => decreaseCart(product)}>-</button>
                      <p>
                        <b>{cart.cartQuantity}</b>
                      </p>
                      <button onClick={() => addToCart(product)}>+</button>
                    </div>
                  )}
                  {isCartAdded < 0 ? null : (
                    <p>
                      Only <span>few items</span> Left! <br /> Don't miss it
                    </p>
                  )}
                </div>
                <button
                  className="--btn-small --bg-green atc-btn"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>

                <div className="product-details__delivery">
                  <div className="head">
                    <div className="icon">
                      <BsTruck />
                    </div>
                    <p>Free delivery</p>
                  </div>
                  <p style={{ textDecoration: "underline", cursor: "pointer" }}>
                    Enter your Postal code for Delivery Availability
                  </p>
                </div>

                <div className="product-details__delivery">
                  <div className="head">
                    <div className="icon">
                      <CiMemoPad />
                    </div>
                    <p>Return Delivery</p>
                  </div>
                  <p>
                    Free 30days Delivery Returns <span>Details</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="general-specifications">
              <h4 className="general-specifications__title">
                {product.name} General Specifications
              </h4>

              <div className="general-specifications__table">
                <div className="general-specifications__row">
                  <div className="general-specifications__row-key">Brand</div>
                  <div className="general-specifications__row-value">
                    {product.brand}
                  </div>
                </div>
                <div className="general-specifications__row">
                  <div className="general-specifications__row-key">Model</div>
                  <div className="general-specifications__row-value">
                    {product.model}
                  </div>
                </div>
                <div className="general-specifications__row">
                  <div className="general-specifications__row-key">Price</div>
                  <div className="general-specifications__row-value">
                    ₹
                    {product.price
                      .toString()
                      .replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ",")}
                  </div>
                </div>
                <div className="general-specifications__row">
                  <div className="general-specifications__row-key">
                    Release Date
                  </div>
                  <div className="general-specifications__row-value">
                    {product.releaseDate}
                  </div>
                </div>
                <div className="general-specifications__row">
                  <div className="general-specifications__row-key">
                    Model Number
                  </div>
                  <div className="general-specifications__row-value">
                    {product.modelNumber}
                  </div>
                </div>
                <div className="general-specifications__row">
                  <div className="general-specifications__row-key">
                    Weight (g)
                  </div>
                  <div className="general-specifications__row-value">
                    {product.weight}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        <Card>
          <h3>Product Reviews</h3>
          <div>
            {filteredReviews.length === 0 ? (
              <p>There are no reviews for this product yet.</p>
            ) : (
              <>
                {filteredReviews.map((item, index) => {
                  const { rate, review, reviewDate, userName } = item;
                  return (
                    <div key={index} className="review">
                      <StarsRating value={rate} />
                      <p>{capitalizeFirstLowercaseRest(review)}</p>
                      <span>
                        <b>{reviewDate}</b>
                      </span>
                      <br />
                      <span>
                        <b>by: {capitalizeFirstLowercaseRest(userName)}</b>
                      </span>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ProductDetails;
