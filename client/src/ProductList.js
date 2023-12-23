import React, { useState } from 'react'
import Navbar from "./components/Navbar"
import Announcement from "./components/Announcement"
import Products from "./components/Products"
import Newsletter from "./components/Newsletter"
import Footer from "./components/Footer"

import styled from 'styled-components'
import { useLocation } from 'react-router-dom'

const Container=styled.div``
const Title=styled.h1`
margin:20px;
`
const FilterContainer=styled.div`
display:flex;
justify-content:space-between;
`
const Filter=styled.div`
margin:20px;
`
const Text=styled.div`
font-size:17px;
font-weight:600;
margin-right:20px;
`
const Select=styled.select`
padding:10px;
margin-right:20px;
`
const Option=styled.option`
`
const ProductList = () => {
    const location=useLocation();
    const category = location.pathname.split('/')[2];
    const [filter,setFilter]=useState({})
    const [sort,setSort]=useState("newest")

    const handleFilters=(e)=>{
        const value=e.target.value;
        setFilter({
            ...filter,
            [e.target.name]:value.toLowerCase(),
        })
    }
    return (
    <Container>
        <Navbar/>
        <Announcement/>
        <Title>{category}</Title>
        <FilterContainer>
            <Filter><Text>Filter Products:</Text>
            <Select name='color' onChange={handleFilters}>
                <Option disabled selected>Color</Option>
                <Option>White</Option>
                <Option>Black</Option>
                <Option>Blue</Option>
                <Option>Yellow</Option>
                <Option>Green</Option>
            </Select>
            <Select name='size' onChange={handleFilters}>
                <Option disabled selected >Size</Option>
                <Option>XS</Option>
                <Option>S</Option>
                <Option>M</Option>
                <Option>L</Option>
                <Option>XL</Option>
            </Select>
            </Filter>
            <Filter><Text>Sort Products:</Text>
            <Select onChange={(e)=>setSort(e.target.value)}>
                <Option selected value="newest" >Newest</Option>
                <Option value="asc">Price (asc)</Option>
                <Option value="desc">Price (desc)</Option>
            </Select>
            </Filter>
        </FilterContainer>
        <Products category={category} filters={filter} sort={sort}/>
        <Newsletter/>
        <Footer/>
    </Container>
  )
}

export default ProductList