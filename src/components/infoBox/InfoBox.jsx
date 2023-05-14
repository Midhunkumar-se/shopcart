import React from "react";
import "./InfoBox.scss";

const InfoBox = ({ cardClass, title, count, icon }) => {
  return (
    <div className={`info-box-individual`}>
      <h4>{title}</h4>
      <span>
        <p>{count}</p>
        {icon}
      </span>
    </div>
  );
};

export default InfoBox;
