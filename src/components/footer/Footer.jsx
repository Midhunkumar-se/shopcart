import React from "react";
import "./Footer.scss";
import { BsGithub, BsLinkedin, BsTwitter } from "react-icons/bs";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  function pathMatchRoute(route) {
    if (route === location.pathname) {
      return true;
    }
  }
  return (
    <div
      className={`${
        pathMatchRoute("/login") ||
        pathMatchRoute("/register") ||
        pathMatchRoute("/reset") ||
        pathMatchRoute("/cart") ||
        pathMatchRoute("/checkout-success") ||
        pathMatchRoute("/order-history")
          ? "margin"
          : "no-margin"
      }`}
    >
      <div className={`footer`}>
        <div className="footer__links">
          <a
            href="https://github.com/Midhunkumar-se"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            <BsGithub
              style={{
                background: "transparent",
                fontSize: "25px",
                color: "#fff",
              }}
              className="icon"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/midhun-kumar-30b108273/"
            target="_blank"
            rel="noreferrer"
          >
            <BsLinkedin
              style={{
                background: "transparent",
                fontSize: "25px",
                color: "#fff",
              }}
              className="icon"
            />
          </a>
          <a
            href="https://twitter.com/MidhunKumar100"
            target="_blank"
            rel="noreferrer"
          >
            <BsTwitter
              style={{
                background: "transparent",
                fontSize: "25px",
                color: "#fff",
              }}
              className="icon"
            />
          </a>
        </div>
        <div className="footer__links-alt">
          <p
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "10px",
            }}
            className="footer__light-color"
          >
            © 2023 Midhun Kumar. All rights Reserved.
          </p>
          |
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.youtube.com/"
            className="footer__link"
          >
            Portfolio
          </a>
          |
          <a
            href="https://mail.google.com/mail/u/1/?view=cm&amp;fs=1&amp;to=userid@gmail.com&amp;tf=1"
            className="footer__link"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            <span className="footer__light-color">Email:</span>{" "}
            midhunkumar654@outlook.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
