import React from 'react'
import styled from 'styled-components'
import Navbar from './components/Navbar'
import Announcement from './components/Announcement'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
const Container=styled.div`

`
const Wrapper=styled.div`
padding:50px;
display:flex;
`
const ImgContainer=styled.div`
flex:1;
`
const Image=styled.img`
width:100%;
height:90vh;
object-fit:cover
`
const Title=styled.h1`
font-weight:200;
`
const Desc=styled.p`
margin:20px 0px;
`
const Price=styled.span`
font-weight:100;
font-size:40px;
`
const Info=styled.div`
flex:1;
padding:0px 50px;
`
const FilterContainer=styled.div`
display:flex;
justify-content:space-between;
margin:20px 0px;
width:50%;
`
const Filter=styled.div`
display:flex;
align-items:center;
`
const FilterTitle=styled.span`
font-size:20px;
font-weight:200;
`
const FilterColor=styled.div`
width:20px;
heigth:20px;
border-radius:50%;
background:${props=>props.color}
margin:0px 5px;
cursor:pointer;
`
const FilterSize=styled.select`
margin-left:10px;
padding:5px;
`
const AddContainer=styled.div`
display:flex;
align-items:center;
justify-content:space-between;
width:50%;
`
const Quantity=styled.div`
display:flex;
align-items:center;
font-weight:700;
`
const Total=styled.div`
width:30px;
height:30px;
border-radius:10px;
border:3px solid teal;
display:flex;
justify-content:center;
align-items:center;
margin:0px 5px;
`
const Button=styled.button`
padding:15px;
border:1px solid teal;
cursor:pointer;
font-weight:500;
&:hover{
  background:#f4f6ff;
  color:teal;
  }
`
const FilterSizeOption=styled.option`

`

const Product = () => {
  return (
    <Container>
        <Navbar/>
        <Announcement/>
        <Wrapper>
            <ImgContainer>
              <Image src="https://www.jiomart.com/images/product/original/rvowvf0akl/eyebogler-men-s-polo-neck-regular-fit-half-sleeves-colorblocked-teal-t-shirt-product-images-rvowvf0akl-0-202211051905.jpg?im=Resize=(500,630)"/>
            </ImgContainer>
          <Info>
            <Title>
              Polo T-Shirt
            </Title>
            <Desc>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere tristique arcu, non facil
            </Desc>
            <Price>$ 30</Price>
            <FilterContainer>
              <Filter>
                <FilterTitle>Color</FilterTitle>
                <FilterColor color="black"/>
                <FilterColor color="blue"/>
                <FilterColor color="gray"/>
              </Filter>

              <Filter>
                <FilterTitle>Size</FilterTitle>
                <FilterSize>
                  <FilterSizeOption>XS</FilterSizeOption>
                  <FilterSizeOption>S</FilterSizeOption>
                  <FilterSizeOption>M</FilterSizeOption>
                  <FilterSizeOption>L</FilterSizeOption>
                  <FilterSizeOption>XL</FilterSizeOption>
                </FilterSize>
              </Filter>
            </FilterContainer>
            <AddContainer>
              <Quantity>
                <RemoveOutlinedIcon/>
                <Total>1</Total>
                <AddOutlinedIcon/>                
              </Quantity>
              <Button>Add To Cart</Button>
            </AddContainer>
          </Info>
        </Wrapper>
        <Newsletter/>
        <Footer/>
    </Container>
  )
}

export default Product