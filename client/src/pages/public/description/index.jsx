import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Description() {
  const { id } = useParams(); // Lấy param trên url
  const [product, setProduct] = useState({});

  // gọi API lấy thông tin chi tiết một sản phẩm theo id
  const getProductById = () => {
    axios
      .get(`http://localhost:3000/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProductById();
  }, []);

  return (
    <div>
      <div>
        <img height={300} width={300} src={product.image} alt="" />
        <div>{product.productName}</div>
        <div>{product.price}</div>
        <div>{product.description}</div>
      </div>
    </div>
  );
}
