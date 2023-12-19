import React from 'react'
import Navbar from "./components/Navbar"
import Announcement from "./components/Announcement"
import Products from "./components/Products"
import Newsletter from "./components/Newsletter"
import Footer from "./components/Footer"

import styled from 'styled-components'

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
  return (
    <Container>
        <Navbar/>
        <Announcement/>
        <Title>Dresses</Title>
        <FilterContainer>
            <Filter><Text>Filter Products:</Text>
            <Select>
                <Option disabled  >Color</Option>
                <Option>White</Option>
                <Option>Black</Option>
                <Option>Blue</Option>
                <Option>Yellow</Option>
                <Option>Green</Option>
            </Select>
            <Select>
                <Option disabled  >Size</Option>
                <Option>XS</Option>
                <Option>S</Option>
                <Option>M</Option>
                <Option>L</Option>
                <Option>XL</Option>
            </Select>
            </Filter>
            <Filter><Text>Sort Products:</Text>
            <Select>
                <Option disabled  >Newest</Option>
                <Option>Price (asc)</Option>
                <Option>Price (desc)</Option>
            </Select>
            
            </Filter>
        </FilterContainer>
        <Products/>
        <Newsletter/>
        <Footer/>
    </Container>
  )
}

export default ProductList