import React, { useState } from "react";
import "./auth.scss";
import logo from "../../assets/logo/pngegg.png";
import Card from "../../components/card/Card";
import { Link, useNavigate } from "react-router-dom";
import { OAuth } from "../../components";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../firebase/config";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const navigate = useNavigate();

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        navigate("/");
      }
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
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
          <h2>Login</h2>
          <div className="line"></div>
          <form onSubmit={onSubmit}>
            <div className="--form-control">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                onChange={onChange}
                type="text"
                placeholder="Email"
                required
              />
            </div>
            <div className="--form-control">
              <label htmlFor="email">Password</label>
              <input
                id="password"
                onChange={onChange}
                type="password"
                placeholder="password"
                required
              />
            </div>
            <Link className="form__forgotPassword" to="/reset">
              Forgot Password?
            </Link>
            {isLoading ? (
              <button
                disabled
                className="form__btn --btn --bg-green"
                type="submit"
                style={{ cursor: "default", backgroundColor: "#6edd69" }}
              >
                Signing In...
              </button>
            ) : (
              <button className="form__btn --btn --bg-green" type="submit">
                Login
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

export default Login;
