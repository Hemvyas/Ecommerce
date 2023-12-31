import React from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import ProductItem from './components/ProductItem'
import Navbar from './components/Navbar'

const Container=styled.div``
const Wrapper=styled.div`
display:flex;
flex-wrap:wrap;
gap:10px;
`

const Search = () => {
    const location=useLocation();
    console.log(location);
    let searchResults=location.state?.searchResults || []
  return (
  
    <Container>
      <Navbar/>
      <Wrapper>
      {searchResults.length > 0 ? (
        searchResults.map((item) => (
          <ProductItem key={item.id} item={item} />
        ))
      ) : (
        <p>No results found</p>
      )}
    </Wrapper>
    </Container>
  )
}

export default Search