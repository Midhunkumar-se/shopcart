import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_BY_BRAND,
  FILTER_BY_CATEGORY,
  FILTER_BY_PRICE,
  SORT_PRODUCTS,
} from "../../../redux/slice/filterSlice";
import {
  selectMaxPrice,
  selectMinPrice,
  selectProducts,
} from "../../../redux/slice/productSlice";
import "./ProductFilter.scss";

const ProductFilter = () => {
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [sort, setSort] = useState("latest");
  const [price, setPrice] = useState(3000);
  const products = useSelector(selectProducts);
  const minPrice = useSelector(selectMinPrice);
  const maxPrice = useSelector(selectMaxPrice);

  const dispatch = useDispatch();

  const allCategories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];
  const allBrands = [
    "All",
    ...new Set(products.map((product) => product.brand)),
  ];

  useEffect(() => {
    dispatch(FILTER_BY_BRAND({ products, brand }));
  }, [dispatch, products, brand]);

  useEffect(() => {
    dispatch(FILTER_BY_PRICE({ products, price }));
  }, [dispatch, products, price]);

  useEffect(() => {
    dispatch(FILTER_BY_CATEGORY({ products, category }));
  }, [dispatch, products, category]);

  useEffect(() => {
    dispatch(SORT_PRODUCTS({ products, sort }));
  }, [dispatch, products, sort]);

  const clearFilters = () => {
    setCategory("All");
    setBrand("All");
    setPrice(maxPrice);
  };

  return (
    <div className="filter">
      {/* Sort Categories */}
      <div className="categories select">
        <label>Categories:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {allCategories.map((cat, index) => {
            return (
              <option key={index} value={cat}>
                {cat}
              </option>
            );
          })}
        </select>
      </div>

      {/* Sort Brand */}
      <div className="brand select">
        <label>Brand:</label>
        <select value={brand} onChange={(e) => setBrand(e.target.value)}>
          {allBrands.map((brand, index) => {
            return (
              <option key={index} value={brand}>
                {brand}
              </option>
            );
          })}
        </select>
      </div>

      {/* Sort Price */}
      <div className="price">
        <div style={{ display: "flex" }}>
          <label>Price:</label>
          <p>{`₹${price
            .toString()
            .replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ",")}`}</p>
        </div>
        <input
          type="range"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          min={minPrice}
          max={maxPrice}
        />
      </div>

      {/* Sort Products */}
      <div className="sort select">
        <label>Sort by:</label>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="latest">Latest</option>
          <option value="lowest-price">Lowest Price</option>
          <option value="highest-price">Highest Price</option>
          <option value="a-z">A - Z</option>
          <option value="z-a">Z - A</option>
        </select>
      </div>

      <button className="--btn-small --bg-green" onClick={clearFilters}>
        Clear Filter
      </button>
    </div>
  );
};

export default ProductFilter;
