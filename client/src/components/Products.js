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
position:relative;
`
const Loading = styled.div`
  position:absolute;
  left:50%;
  top:50%;
  transform:translateX(-50%,-50%) ;
  font-size:110px;
`;
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
        <Loading>
          <CircularProgress />
        </Loading>
      ) : (
        randomProducts.map((item) => <ProductItem item={item} key={item.id} />)
      )}
    </Container>
  );
}

export default Products