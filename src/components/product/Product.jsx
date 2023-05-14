import React, { useEffect, useState } from "react";
import ProductFilter from "./productFilter/ProductFilter";
import ProductList from "./productList/ProductList";
import "./Product.scss";
import { useDispatch, useSelector } from "react-redux";
import useFetchCollection from "../../customHooks/useFetchCollection";
import {
  GET_PRICE_RANGE,
  selectProducts,
  STORE_PRODUCTS,
} from "../../redux/slice/productSlice";
import "./Product.scss";
import Loader from "../../components/loader/Loader";

const Product = () => {
  const { data, isLoading } = useFetchCollection("products");
  const [showFilter, setShowFilter] = useState(false);
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );

    dispatch(
      GET_PRICE_RANGE({
        products: data,
      })
    );
  }, [dispatch, data]);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };
  return (
    <section>
      <div className="product container">
        <aside className="filter-aside">{isLoading ? null : <ProductFilter />}</aside>
        <div className="content">
          {isLoading ? <Loader /> : <ProductList products={products} />}
        </div>
      </div>
    </section>
  );
};

export default Product;
