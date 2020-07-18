import React from "react";
import Listing from "./listing";
import Categories from "./Categories";

const Store = () => {
  return (
    <div className="container">
      <div className="row">
        <Categories />
        <Listing />
      </div>
    </div>
  );
};

export default Store;
