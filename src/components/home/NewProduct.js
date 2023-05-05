// racfe
import React, { useState, useEffect } from "react";
import { listProductBy } from "../functions/product";

import ProductCard from "../card/ProductCard";
import LoadingCard from "../card/LoadingCard";

const NewProduct = () => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    listProductBy("createdAt", "desc", 3)
      .then((res) => {
        setLoading(false);
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <>
      <div className="container">
        {loading 
        ? (<LoadingCard count= {3}/>) 
        : (
          <div className="row">
            {product.map((item, index) => (
              <div key={index} className="col-md-4">
                <ProductCard product={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default NewProduct;
