import React, { useState, useEffect } from "react";
import Product from "../detail/Product";
import axios from "../axios/axios";
import "./ProductView.css";
import { useParams } from "react-router-dom";
//import Recommendation from '../home/Recommendation';

//카테고리 id에 맞게 출력될 것

function ProductView() {
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    async function fetchDate() {
      const request = await axios
        .get("products/all")
        .then(response => setProducts(response.data))
        .catch(error => console.log(error));

      return request;
    }

    fetchDate();
  }, []);

  return (
    <div className="products">
      <div className="products__row">
        {products
          .filter(function (product) {
            return product.category_id == id;
          })
          .map((product, i) => {
            return (
              <Product
                id={product.product_id}
                title={product.product_name}
                image={product.product_picture}
                description={product.product_description}
                price={product.product_price}
                key={i}
              />
            );
          })}
      </div>
    </div>
  );
}

export default ProductView;
