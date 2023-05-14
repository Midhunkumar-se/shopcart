import React from "react";
import { Link } from "react-router-dom";
import "./Error.scss";
import logo from "../../assets/logo/pngegg.png";

const ErrorPage = () => {
  return (
    <div className="error">
      <Link to="/" className="error__logo">
        <img
          src={logo}
          alt="logo"
          width={"60px"}
          style={{ marginTop: "20px" }}
        />
      </Link>
      <h2 className="error__title">Looking for something?</h2>
      <p className="error__para">
        We're sorry. The Web address you entered is not a functioning page on
        our site.
      </p>
      <h2 className="error__guide">
        ▶ Go to Shopcart's <Link to="/">Home</Link> Page
      </h2>
    </div>
  );
};

export default ErrorPage;
