import React from "react";
import "./Banner.scss";
import hero from "../../assets/images/wireless-08.png";

const Banner = () => {
  return (
    <div className="banner">
      <div className="banner__text">
        <h2>
          Don't miss out on our exclusive <br /> online sale!
        </h2>
        <p>
          Get the best deals on your favorite products and brands, all from the
          comfort of your own home. Shop now and enjoy huge discounts on
          everything from fashion to electronics, with free shipping on all
          orders.
        </p>
        <a href="#product" className="--btn-small --bg-green">
          Shop now
        </a>
      </div>
      <div className="banner__image">
        <img src={hero} alt="furniture" width="500px" />
      </div>
    </div>
  );
};

export default Banner;
