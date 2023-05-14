import React from "react";
import "./Search.scss";
import { BiSearch } from "react-icons/bi";

const Search = ({ value, onChange }) => {
  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search by name"
        value={value}
        onChange={onChange}
      />

      <BiSearch size={18} className="icon" />
    </div>
  );
};

export default Search;
