import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
const Container=styled.div`
flex:1;
height:70vh;
margin:3px;
position:relative;
overflow:hidden;
&:hover .colorImg {
    opacity:1
 }
`
const Image=styled.img`
width:100%;
height:100%;
object-fit:cover;
`
const ColorImg=styled.img`
width:100%;
height:100%;
object-fit:cover;
position:absolute;
top:0;
left:0;
opacity: 0;
transition: opacity 0.3s ease-in-out;
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
        <Image src={item.mainImg}/>
        <ColorImg className="colorImg" src={item.colorImg}/>
        <Info>
            <Title>{item.title}</Title>
            <Button>SHOP NOW</Button>
        </Info>
    </Container>
  )
}

export default CategoryItem