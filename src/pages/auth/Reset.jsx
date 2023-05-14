import React, { useState } from "react";
import "./auth.scss";
import logo from "../../assets/logo/pngegg.png";
import Card from "../../components/card/Card";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { OAuth } from "../../components";
import { auth } from "../../firebase/config";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function onChange(e) {
    setEmail(e.target.value);
  }

  async function onSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Email was sent");
      setIsLoading(false);
    } catch (error) {
      toast.error("Could not send reset password, Enter valid email");
      setIsLoading(false);
    }
  }

  return (
    <section className="auth-container auth">
      <Link to="/">
        <div className="auth__logo">
          <img src={logo} alt="shopcart" width="30px" />
          <h4>Shopcart.</h4>
        </div>
      </Link>
      <Card>
        <div className="form">
          <h2>Reset Password</h2>
          <div className="line"></div>
          <form onSubmit={onSubmit}>
            <div className="--form-control">
              <label htmlFor="email">Email</label>
              <input
                onChange={onChange}
                type="email"
                placeholder="Email"
                required
              />
            </div>
            <Link className="form__forgotPassword" to="/login">
              Login instead
            </Link>
            {isLoading ? (
              <button
                disabled
                className="form__btn --btn --bg-green"
                type="submit"
                style={{ cursor: "default", backgroundColor: "#6edd69" }}
              >
                Sending email...
              </button>
            ) : (
              <button className="form__btn --btn --bg-green" type="submit">
                Send reset email
              </button>
            )}
            <div className="form__border-line">
              <p>OR</p>
            </div>
            <OAuth />
            <p className="form__register-account">
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </form>
        </div>
      </Card>
    </section>
  );
};

export default Reset;
