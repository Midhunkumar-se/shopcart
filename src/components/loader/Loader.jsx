import React from "react";
import "./Loader.scss";

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "400px",
      }}
    >
      <div className="loader"></div>
    </div>
  );
};
export const SmallLoader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "20px",
      }}
    >
      <div className="smallLoader"></div>
    </div>
  );
};

export default Loader;
