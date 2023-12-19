import React from 'react'
import {product} from "../data"
import styled from 'styled-components'
import ProductItem from "./ProductItem"

const Container=styled.div`
display:flex;
padding:20px;
flex-wrap:wrap;
justify-content:space-between;
`
const Products = () => {
  return (
    <Container>
    {product.map(item=>(
        <ProductItem item={item} key={item.id}/>
    ))}
    </Container>
  )
}

export default Products