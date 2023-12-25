import React, { useEffect, useState } from 'react'
import {product} from "../data"
import styled from 'styled-components'
import ProductItem from "./ProductItem"
import axios from "axios"

const Container=styled.div`
display:flex;
padding:20px;
flex-wrap:wrap;
justify-content:space-between;
`
const Products = ({category,filters,sort}) => {

  const [products,setProducts]=useState([]);
  const [filteredProducts,setFilteredProducts]=useState([]);
  const [randomProducts,setRandomProducts]=useState([]);

  useEffect(() => {
    const getRandomProducts=async()=>{
      const res=await axios.get("http://localhost:5000/api/category/random");
      setRandomProducts(res.data);
    }
    getRandomProducts();
  }, [])
  

  useEffect(()=>{
    const getProducts=async()=>{
      try {
        const res= await axios.get(category ? `http://localhost:5000/api/product?category=${category}` 
                                            : "http://localhost:5000/api/product");
        setProducts(res.data);
        // console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }
getProducts();
  },[category])



  useEffect(()=>{
     category && setFilteredProducts(
      products.filter((item)=>Object.entries(filters).every(([key,value])=>
      item[key].includes(value)))
     )

  },[category,products,filters])

  useEffect(()=>{
    if (sort==="newest") {
      setFilteredProducts(item=>[...item].sort((a,b)=>a.createdAt-b.createdAt))
    }
    else if(sort==="asc"){
      setFilteredProducts(item=>[...item].sort((a,b)=>a.price-b.price))
    }
    else{
      setFilteredProducts(item=>[...item].sort((a,b)=>b.price-a.price))
    }
  },[sort])

  return (
    <Container>
    {category ? filteredProducts.map(item=>(
        <ProductItem item={item} key={item.id}/>
    )):
    randomProducts.map(item=>(
        <ProductItem item={item} key={item.id}/>
    ))}
    </Container>
  )
}

export default Products