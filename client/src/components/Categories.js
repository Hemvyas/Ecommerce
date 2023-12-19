import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
// import { categories } from '../data'
import CategoryItem from './CategoryItem'
import axios from "axios"

const Container=styled.div`
display:flex;
padding:20px;
justify-content:space-between;
`
const Categories = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts=async()=>{
      try {
        const res= await axios.get('https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list', 
        {
          params: {
            country: 'us',
              lang: 'en',
             currentpage: '0',
              pagesize: '30',
               categories: 'men_all',
                concepts: 'H&M MAN'
          },
          headers: {
            'X-RapidAPI-Key': 'd9b59b11bfmshc4248ff5af9dffbp167912jsn54dd52ce43a7',
            'X-RapidAPI-Host': 'apidojo-hm-hennes-mauritz-v1.p.rapidapi.com',
          },  
      });
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProducts();
  }, [])
  
  return (
    <Container>
        {products.map(item=>(
            <CategoryItem item={item} key={item.id}/>
        ))}
    </Container>
  )
}

export default Categories