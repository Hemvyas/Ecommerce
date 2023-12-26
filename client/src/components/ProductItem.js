import React from 'react'
import styled from 'styled-components'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link } from 'react-router-dom';

const Info=styled.div`
opacity:0;
width:100%;
height:100%;
position:absolute;
top:0;
left:0;
background:gray;
z-index:1;
align-items:center;
justify-content:center;
display:flex;
background:rgba(0,0,0,0.2);
transition:all 0.5s ease;
cursor:pointer;
`

const Container=styled.div`
flex:1;
margin:5px;
min-width:280px;
height:350px;
display:flex;
justify-content:center;
align-items:center;
background:#f5fbfd;
position:relative;

&:hover ${Info}{
  opacity:1;
}
`
const Circle=styled.div`
height:200px;
width:200px;
border-radius:50%;
background:#fff;
position:absolute;
`
const Image=styled.img`
height:75%;
z-index:1;
object-fit:cover;
`

const Icon=styled.div`
width:40px;
height:40px;
border-radius:50%;
background:#fff;
display:flex;
justify-content:center;
align-items:center;
margin:10px;
cursor:pointer;
transition:all 0.5s ease-in-out;
color:inherit;

&:hover{
  background:#e9f5f5;
  transform:scale(1.1);
}
`
const ProductItem = ({item}) => {
  return (
    <Container>
    <Circle/>
        <Image src={item.mainImg} alt={item.title} loading='lazy' />
    <Info>
      <Icon>
        <ShoppingCartOutlinedIcon/>
      </Icon>
      <Link to={`/product/${item._id}`}>
      <Icon>
        <SearchOutlinedIcon/>
      </Icon>
      </Link>
      <Icon>
        <FavoriteBorderOutlinedIcon/>
      </Icon>
    </Info>
    </Container>
  )
}

export default ProductItem