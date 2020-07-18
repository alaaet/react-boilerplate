import React from "react";
import Item from "./item";

const Listing = () => {
  return (
    <div className="col">
      <div className="row">
        {products.map((product, index) => {
          return <Item product={product} key={index} index={index} />;
        })}
      </div>
    </div>
  );
};

/*
const Listing = () => {
  return (
    <div className="col-lg-8 mx-auto">
      {products.map((product, index) => {
        return <Item product={product} key={index} index={index} />;
      })}
    </div>
  );
};

*/
const products = [
  {
    name: "Product title",
    img: "https://dummyimage.com/600x400/55595c/fff",
    price: "99.00 $",
    description:
      "Some quick example text to build on the card title and make up the bulk of the card's content.",
  },
  {
    name: "Product title",
    img: "https://dummyimage.com/600x400/55595c/fff",
    price: "99.00 $",
    description:
      "Some quick example text to build on the card title and make up the bulk of the card's content.",
  },
  {
    name: "Product title",
    img: "https://dummyimage.com/600x400/55595c/fff",
    price: "99.00 $",
    description:
      "Some quick example text to build on the card title and make up the bulk of the card's content.",
  },
  {
    name: "Product title",
    img: "https://dummyimage.com/600x400/55595c/fff",
    price: "99.00 $",
    description:
      "Some quick example text to build on the card title and make up the bulk of the card's content.",
  },
  {
    name: "Product title",
    img: "https://dummyimage.com/600x400/55595c/fff",
    price: "99.00 $",
    description:
      "Some quick example text to build on the card title and make up the bulk of the card's content.",
  },
  {
    name: "Product title",
    img: "https://dummyimage.com/600x400/55595c/fff",
    price: "99.00 $",
    description:
      "Some quick example text to build on the card title and make up the bulk of the card's content.",
  },
];
export default Listing;
