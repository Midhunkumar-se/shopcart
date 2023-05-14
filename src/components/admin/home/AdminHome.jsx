import React, { useEffect } from "react";
import InfoBox from "../../infoBox/InfoBox";
import "./AdminHome.scss";
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import { FaCartArrowDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProducts,
  STORE_PRODUCTS,
} from "../../../redux/slice/productSlice";
import {
  CALC_TOTAL_ORDER_AMOUNT,
  selectOrderHistory,
  selectTotalOrderAmount,
  STORE_ORDERS,
} from "../../../redux/slice/orderSlice";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import Chart from "../../chart/Chart";

//Icons
const earningIcon = <AiFillDollarCircle size={30} color="#b624ff" />;
const productIcon = <BsCart4 size={30} color="#1f93ff" />;
const ordersIcon = <FaCartArrowDown size={30} color="orangered" />;

const AdminHome = () => {
  const products = useSelector(selectProducts);
  const orders = useSelector(selectOrderHistory);
  const totalOrderAmount = useSelector(selectTotalOrderAmount);

  const fbProducts = useFetchCollection("products");
  const { data } = useFetchCollection("orders");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: fbProducts.data,
      })
    );

    dispatch(STORE_ORDERS(data));

    dispatch(CALC_TOTAL_ORDER_AMOUNT());
  }, [dispatch, data, fbProducts]);

  return (
    <div className="home">
      <h2>Admin Home</h2>
      <div className="info-box">
        <InfoBox
          cardClass={`card card1`}
          title={"Earnings"}
          count={`₹${
            totalOrderAmount
              ? totalOrderAmount
                  .toString()
                  .replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ",")
              : 0
          }`}
          icon={earningIcon}
        />
        <InfoBox
          cardClass={`card card2`}
          title={"Products"}
          count={products.length}
          icon={productIcon}
        />
        <InfoBox
          cardClass={`card card3`}
          title={"Orders"}
          count={orders.length}
          icon={ordersIcon}
        />
      </div>
      <div>
        <Chart />
      </div>
    </div>
  );
};

export default AdminHome;
