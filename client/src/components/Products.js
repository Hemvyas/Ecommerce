import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProductItem from "./ProductItem";
import axios from "axios";

const Container = styled.div`
  display: flex;
  padding: 20px;
  flex-wrap: wrap;
  justify-content: space-between;
  position: relative;
`;

const Products = () => {
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    const getRandomProducts = async () => {
      const res = await axios.get(
        "https://ecommerce-brown-one.vercel.app/api/category/random"
      );
      setRandomProducts(res.data);
    };
    getRandomProducts();
  }, []);

  return (
    <Container>
      {randomProducts.map((item) => (
        <ProductItem item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Products;
