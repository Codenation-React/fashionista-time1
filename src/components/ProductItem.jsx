import React from "react";

const ProductItem = ({ product }) => {
  const { name, price } = product;

  return (
    <div>
      <span>Product {name}</span>
      <span>Price {price}</span>
    </div>
  );
};

export default ProductItem;
