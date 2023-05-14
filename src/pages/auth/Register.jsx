import React, { useState } from "react";
import "./auth.scss";
import logo from "../../assets/logo/pngegg.png";
import Card from "../../components/card/Card";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { auth, db } from "../../firebase/config";
import { OAuth } from "../../components";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const emailIsValid = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(
    email
  );
  const nameIsValid = name.length >= 3 && name.trim() !== "";
  const passwordIsValid = password.length >= 6 && password.trim() !== "";

  const navigate = useNavigate();

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  async function onSubmit(e) {
    e.preventDefault();

    if (!nameIsValid) {
      toast.error("Name should be greater than or equal to 3 characters");
      return;
    }

    if (!emailIsValid) {
      toast.error("Enter valid email");
      return;
    }

    if (!passwordIsValid) {
      toast.error("Password should be greater than or equal to 6 characters");
      return;
    }

    if (password !== password2) {
      toast.error("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      updateProfile(auth.currentUser, {
        displayName: name,
      });
      const user = userCredential.user;
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      delete formDataCopy.password2;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);
      toast.success("Sign up was successfull");
      navigate("/");
      setIsLoading(false);
    } catch (error) {
      // toast.error("Something went wrong with the registration");
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
          <h2>Register</h2>
          <div className="line"></div>
          <form onSubmit={onSubmit}>
            <div className="--form-control">
              <label htmlFor="name">Full Name</label>
              <input
                onChange={onChange}
                id="name"
                type="text"
                placeholder="Full name"
                required
              />
            </div>
            <div className="--form-control">
              <label htmlFor="email">Email</label>
              <input
                onChange={onChange}
                id="email"
                type="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="--form-control">
              <label htmlFor="password">Password</label>
              <input
                onChange={onChange}
                id="password"
                type="password"
                placeholder="password"
                required
              />
            </div>
            <div className="--form-control">
              <label htmlFor="password2">Confirm Password</label>
              <input
                onChange={onChange}
                id="password2"
                type="password"
                placeholder="Confirm password"
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
                Sign up
              </button>
            )}
            <div className="form__border-line">
              <p>OR</p>
            </div>
            <OAuth />
            <p className="form__register-account">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </Card>
    </section>
  );
};

export default Register;
