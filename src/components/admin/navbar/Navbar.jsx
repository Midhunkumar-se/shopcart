import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { BsFillFileEarmarkSpreadsheetFill } from "react-icons/bs";
import { MdAddBox } from "react-icons/md";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { selectUserName } from "../../../redux/slice/authSlice";
import "./Navbar.scss";

// const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Navbar = () => {
  const userName = useSelector(selectUserName);

  return (
    <div className="navbar">
      <div className="navbar__user">
        <div className="img">
          <FaUserCircle size={40} color="#fff" />
        </div>
        <h4>Hi, {userName}</h4>
      </div>
      <nav>
        <ul className="navbar__menus">
          <span
            style={{ display: "flex", alignItems: "center", width: "100%" }}
            title="Home"
          >
            <li className="navbar__menu">
              <NavLink to="/admin/home">
                {" "}
                <AiFillHome /> <span className="span-hide"> Home </span>
              </NavLink>
            </li>
          </span>
          <span
            style={{ display: "flex", alignItems: "center", width: "100%" }}
            title="All Products"
          >
            <li className="navbar__menu">
              <NavLink to="/admin/all-products">
                {" "}
                <BsFillBoxSeamFill />{" "}
                <span className="span-hide">All Products</span>
              </NavLink>
            </li>
          </span>
          <span
            style={{ display: "flex", alignItems: "center", width: "100%" }}
            title="Add Product"
          >
            <li className="navbar__menu">
              <NavLink to="/admin/add-product/ADD">
                {" "}
                <MdAddBox /> <span className="span-hide">Add Product</span>
              </NavLink>
            </li>
          </span>

          <span
            style={{ display: "flex", alignItems: "center", width: "100%" }}
            title="Orders"
          >
            <li className="navbar__menu">
              <NavLink to="/admin/orders">
                {" "}
                <BsFillFileEarmarkSpreadsheetFill />
                <span className="span-hide">Orders</span>
              </NavLink>
            </li>
          </span>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
