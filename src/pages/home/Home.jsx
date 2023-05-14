import React, { useEffect } from "react";
import Product from "../../components/product/Product";
import Banner from "../../components/banner/Banner";

const Home = () => {
  const url = window.location.href;

  useEffect(() => {
    const scrollToProducts = () => {
      if (url.includes("#products")) {
        window.scrollTo({
          top: 400,
          behavior: "smooth",
        });
        return;
      }
    };
    scrollToProducts();
  }, [url]);

  return (
    <div>
      <Banner />
      <Product />
    </div>
  );
};

export default Home;
