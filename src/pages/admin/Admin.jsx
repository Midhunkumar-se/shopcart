import React from "react";
import Navbar from "../../components/admin/navbar/Navbar";
import { Route, Routes } from "react-router-dom";

import "./Admin.scss";
import AdminHome from "../../components/admin/home/AdminHome";
import ViewProducts from "../../components/admin/viewProducts/ViewProducts";
import AddProduct from "../../components/admin/addProduct/AddProduct";
import Orders from "../../components/admin/orders/Orders";
import OrderDetails from "../../components/admin/orderDetails/OrderDetails";

const Admin = () => {
  return (
    <div className="admin">
      <div className="navbar-wrap">
        <Navbar />
      </div>
      <div className="content">
        <Routes>
          <Route path="home" element={<AdminHome />} />
          <Route path="all-products" element={<ViewProducts />} />
          <Route path="add-product/:id" element={<AddProduct />} />
          <Route path="orders" element={<Orders />} />
          <Route path="order-details/:id" element={<OrderDetails />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
