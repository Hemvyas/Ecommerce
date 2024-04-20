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
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  @media (max-width: 450px) {
    height: 40vh;
  }
  @media (max-width: 390px) {
    height: 30vh;
  }
`;
const ColorImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  @media (max-width: 450px) {
    object-fit:cover;
  }
`;
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

const Title = styled.h1`
  color: #fff;
  margin-bottom: 20px;
  @media (max-width: 500px) {
    font-size: 30px;
    text-align:center;
  }
`;
const CategoryItem = ({item}) => {
  return (
        <Container>
        <Image src={item.mainImg}/>
        <ColorImg className="colorImg" src={item.colorImg}/>
        <Info>
            <Title>{item.title}</Title>
            <Link to={`/category/${item.categories}`}>
            <Button>SHOP NOW</Button>
            </Link>
        </Info>
    </Container>
  )
}

export default CategoryItem