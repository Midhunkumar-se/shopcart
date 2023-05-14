import React, { useEffect, useState } from "react";
import "./ProductList.scss";
import Search from "../../search/Search";
import ProductItem from "../productItem/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_BY_SEARCH,
  selectFilteredProducts,
} from "../../../redux/slice/filterSlice";
import Pagination from "../../pagination/Pagination";

const ProductList = ({ products }) => {
  const [search, setSearch] = useState("");

  const filteredProducts = useSelector(selectFilteredProducts);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);
  // Get Current Products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ products, search }));
  }, [dispatch, products, search]);

  return (
    <div className="product-list" id="product">
      <div className="top">
        <p style={{ gap: "5px", display: "flex", alignItems: "flex-end" }}>
          <b>{filteredProducts.length}</b> Products found.
        </p>
        {/* Search Icon */}
        <div>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="grid">
        {products.length === 0 ? (
          <p>No product found.</p>
        ) : (
          <>
            {currentProducts.map((product) => {
              return (
                <div
                  key={product.id}
                  style={{
                    border: "none",
                    width: "100%",
                  }}
                >
                  <ProductItem {...product} product={product} />
                </div>
              );
            })}
          </>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        productsPerPage={productsPerPage}
        totalProducts={filteredProducts.length}
      />
    </div>
  );
};

export default ProductList;
