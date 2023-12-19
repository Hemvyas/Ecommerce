import React from 'react'
import Navbar from "./components/Navbar"
import Announcement from "./components/Announcement"
import Footer from "./components/Footer"
import styled from 'styled-components'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
const Container=styled.div``
const Wrapper=styled.div`
padding:20px;
`
const Title=styled.h1`
font-weight:300;
text-align:center;
`

const Top=styled.div`
display:flex;
align-items:center;
justify-content:space-between;
`
const Button=styled.button`
padding:10px;
font-weight:600;
cursor:pointer;
border:${props=>props.type==="filled" && "none"};
background:${props=>props.type==="filled" ? "black":"transparent"};
color:${props=>props.type==="filled" && "white"};
`
const Content=styled.div`

`
const Text=styled.span`
text-decoration:underline;
cursor:pointer;
`
const Bottom=styled.div`
display:flex;
justify-content:space-between;
`
const Info=styled.div`
flex:3;
`
const Summary=styled.div`
flex:1;
border:0.5px solid lightgary;
border-radius:10px;
padding:20px;
height:50vh;
`
const Product=styled.div`
display:flex;
justify-content:center;
`
const ProductInfo=styled.div`
flex:2;
display:flex;
`
const Image=styled.img`
width:200px;
`
const Name=styled.span``
const Details=styled.div`
padding:20px;
display:flex;
flex-direction:column;
justify-content:space-around;
`
const ID=styled.span``
const Size=styled.span``
const Price=styled.span`
flex:1;
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;
`
const Color=styled.span`
width:20px;
height:20px;
border-radius:50%;
background:${props=>props.color}
`
const Quantity=styled.div`
display:flex;
align-items:center;
margin-bottom:20px;
`
const ProductQuantity=styled.div`
font-size:24px;
margin:5px;
`
const ProductPrice=styled.div`
font-size:30px;
font-weight:200;
`
const Hr=styled.hr`
background:#eee;
border:none;
height:1px;
`
const SummaryTitle=styled.h1`
font-weight:200;
`
const SummaryPrice=styled.span``
const SummaryText=styled.span``
const SummaryItem=styled.div`
margin:30px 0px;
display:flex;
justify-content:space-between;
font-weight:${props=>props.type==="total" && "500"};
font-size:${props=>props.type==="total" && "25px"};
`

const Cart = () => {

    
  return (
    <Container>
        <Navbar/>
        <Announcement/>
        <Wrapper>
<Title>Your Bag</Title>
<Top>
    <Button>CONTINUE SHOPPING</Button>
    <Content>
    <Text>Shopping Bag(2)</Text>
    <Text>Your Wishlist(0)</Text>
    </Content>
    <Button type='filled'>CHECKOUT NOW</Button>
</Top>
<Bottom>
    <Info>
    <Product>
    <ProductInfo>
    <Image src="https://www.thule.com/-/p/BqQQ3zv_GsS7myXOsY5vM26sDG7AlIzKP_qxV_zBNXA/rs:fit/h:991/cb:1.4/w:991/plain/approved/std.lang.all/25/72/1382572.png"/>
    <Details>
        <Name><b>Product:</b>Backpack</Name>
        <ID><b>ID:</b>1231</ID>
        <Color color='black'/>
        <Size><b>Size:</b>26L</Size>
    </Details>
    </ProductInfo>
    <Price>
        <Quantity>
            <AddOutlinedIcon/>
            <ProductQuantity>2</ProductQuantity>
            <RemoveOutlinedIcon/>
        </Quantity>
        <ProductPrice>$ 40</ProductPrice>
    </Price>
    </Product>
<Hr/>
    <Product>
    <ProductInfo>
    <Image src="https://www.thule.com/-/p/BqQQ3zv_GsS7myXOsY5vM26sDG7AlIzKP_qxV_zBNXA/rs:fit/h:991/cb:1.4/w:991/plain/approved/std.lang.all/25/72/1382572.png"/>
    <Details>
        <Name><b>Product:</b>Backpack</Name>
        <ID><b>ID:</b>1231</ID>
        <Color color='black'/>
        <Size><b>Size:</b>26L</Size>
    </Details>
    </ProductInfo>
    <Price>
        <Quantity>
            <AddOutlinedIcon/>
            <ProductQuantity>2</ProductQuantity>
            <RemoveOutlinedIcon/>
        </Quantity>
        <ProductPrice>$ 40</ProductPrice>
    </Price>
    </Product>
    </Info>
    <Summary>
        <SummaryTitle>ORDER SUMMARY</SummaryTitle>
        <SummaryItem>
            <SummaryText>Subtotal</SummaryText>
            <SummaryPrice>$ 60</SummaryPrice>
        </SummaryItem>
        <SummaryItem>
            <SummaryText>Estimated Shipping</SummaryText>
            <SummaryPrice>$ 2</SummaryPrice>
        </SummaryItem>
        <SummaryItem>
            <SummaryText>Discount</SummaryText>
            <SummaryPrice>$ -10</SummaryPrice>
        </SummaryItem>
        <SummaryItem type="total">
            <SummaryText>Total</SummaryText>
            <SummaryPrice>$ 52</SummaryPrice>
        </SummaryItem>
        <Button>CHECKOUT NOW</Button>
    </Summary>
     </Bottom>
        </Wrapper>
        <Footer/>
    </Container>
  )
}

export default Cart