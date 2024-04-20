import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ProductItem from "./ProductItem"
import axios from "axios"
import CircularProgress from "@mui/material/CircularProgress";

const Container=styled.div`
display:flex;
padding:20px;
flex-wrap:wrap;
justify-content:space-between;
`
const Products = () => {
  const [loading,setLoading]=useState(false);
  const [randomProducts,setRandomProducts]=useState([]);

  useEffect(() => {
    const getRandomProducts=async()=>{
      setLoading(true)
      const res = await axios.get(
        "https://ecommerce-brown-one.vercel.app/api/category/random"
      );
      setRandomProducts(res.data);
      setLoading(false);
    }
    getRandomProducts();
  }, [])



  return (
    <Container>
      {loading ? (
        <CircularProgress />
      ) : (
        randomProducts.map((item) => <ProductItem item={item} key={item.id} />)
      )}
    </Container>
  );
}

export default Products