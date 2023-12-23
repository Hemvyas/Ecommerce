import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
const Container=styled.div`
flex:1;
height:70vh;
margin:3px;
position:relative;
`
const Image=styled.img`
width:100%;
height:100%;
object-fit:cover;
`
const Info=styled.div`
position:absolute;
top:0;
bottom:0;
width:100%;
height:100%;
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
`
const Button=styled.button`
border:none;
padding:10px;
background:#fff;
color:gray;
cursor:pointer;
`

const Title=styled.h1`
color:#fff;
margin-bottom:20px;
`
const CategoryItem = ({item}) => {
  return (
    <Container>
    <Link to={`/products/${item.category}`}>
        <Image src={item.img}/>
        <Info>
            <Title>{item.title}</Title>
            <Button>SHOP NOW</Button>
        </Info>
        </Link>
    </Container>
  )
}

export default CategoryItem