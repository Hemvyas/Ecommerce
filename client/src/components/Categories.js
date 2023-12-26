import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import CategoryItem from './CategoryItem'
import axios from "axios"

const Container=styled.div`
display:flex;
padding:20px;
justify-content:space-between;
`
const Categories = () => {

  const [kids,setKids]=useState([]);
  const [mens,setMens]=useState([]);
  const [womens,setWomens]=useState([]);

  useEffect(() => {

    const getkidsProducts=async()=>{
      const res=await axios.get("http://localhost:5000/api/category/kids");
      setKids(res.data)
    }
    const getmensProducts=async()=>{
      const res=await axios.get("http://localhost:5000/api/category/mens");
      setMens(res.data)
    }
    const getwomensProducts=async()=>{
      const res=await axios.get("http://localhost:5000/api/category/womens");
      setWomens(res.data);
    }
    getkidsProducts();
    getmensProducts();
    getwomensProducts();
  }, [])
  

  return (
    <Container>
        {kids.map(item=>(
            <CategoryItem item={item} key={item.id}/>
        ))}
        {mens.map(item=>(
            <CategoryItem item={item} key={item.id}/>
        ))}
        {womens.map(item=>(
            <CategoryItem item={item} key={item.id}/>
        ))}
    </Container>
  )
}

export default Categories