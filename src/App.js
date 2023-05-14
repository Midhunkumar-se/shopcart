import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorPage from "./pages/error/Error";

// Pages
import { Admin, Home, Login, Register, Reset } from "./pages";
import { Fragment } from "react";
import ShowOnLogin, {
  HideLinkOnLogin,
} from "./components/hiddenLinks/hiddenLink";
import AdminOnlyRoute from "./components/adminOnlyRoute/AdminOnlyRoute";

// Components
import ProductDetails from "./components/product/ProductDetails/ProductDetails";

import { Footer, Header } from "./components";
import Cart from "./pages/cart/Cart";
import CheckoutForm from "./components/checkoutForm/CheckoutForm";
import CheckoutSuccess from "./pages/checkout/CheckoutSuccess";
import OrderHistory from "./pages/orderHistory/OrderHistory";
import OrderDetails from "./pages/orderDetails/OrderDetails";
import ReviewProducts from "./pages/reviewProducts/ReviewProducts";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/login"
            element={
              <HideLinkOnLogin>
                <Login />
              </HideLinkOnLogin>
            }
          />
          <Route
            path="/register"
            element={
              <HideLinkOnLogin>
                <Register />
              </HideLinkOnLogin>
            }
          />
          <Route path="/reset" element={<Reset />} />

          <Route
            path="/admin/*"
            element={
              <AdminOnlyRoute>
                <Admin />
              </AdminOnlyRoute>
            }
          />

          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/checkout"
            element={
              <ShowOnLogin>
                <CheckoutForm />
              </ShowOnLogin>
            }
          />
          <Route
            path="/checkout-success"
            element={
              <ShowOnLogin>
                <CheckoutSuccess />
              </ShowOnLogin>
            }
          />
          <Route
            path="/order-history"
            element={
              <ShowOnLogin>
                <OrderHistory />
              </ShowOnLogin>
            }
          />
          <Route
            path="/order-details/:id"
            element={
              <ShowOnLogin>
                <OrderDetails />
              </ShowOnLogin>
            }
          />
          <Route path="/review-product/:id" element={<ReviewProducts />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
