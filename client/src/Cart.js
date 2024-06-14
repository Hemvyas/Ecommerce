import React, { useEffect, useState } from 'react'
import Navbar from "./components/Navbar"
import Announcement from "./components/Announcement"
import Footer from "./components/Footer"
import styled from 'styled-components'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearCart, removerFromCart } from './redux/cartSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StripeCheckout from 'react-stripe-checkout'
import axios from "axios"
const Container=styled.div``
const Wrapper = styled.div`
  padding: 20px;
  @media (max-width: 390px) {
    padding:10px;
  }
`;
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
const Text = styled.span`
  text-decoration: underline;
  cursor: pointer;
  @media (max-width: 390px) {
    display:none;
  }
`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 390px) {
    flex-direction:column;
  }
`;
const Info=styled.div`
flex:3;
`
const Summary=styled.div`
flex:1;
border:0.5px solid lightgray;
border-radius:10px;
padding:20px;
height:50vh;
`
const Product = styled.div`
  display: flex;
  justify-content: center;
  @media (max-width: 390px) {
    flex-direction: column;
  }
`;
const ProductInfo=styled.div`
flex:2;
display:flex;
`
const Image=styled.img`
width:200px;
margin:10px 0px;
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
const DeleteProduct=styled.span`
cursor:pointer;
position:relative;
top:190px;
&:hover{
    color:#ff6347;
    }    
`

const Cart = () => {
const cart=useSelector(state=>state.cart)
 const [token, setToken] = useState(null);
const dispatch=useDispatch();
const navigate=useNavigate();
const key =
  "pk_test_51OOKNlSJrhaILpp92Nl5MEik6Q00mAekKGiVNGiwqWLJ7Q7B0emjITRdKvSBOnImsjgz0t7U8MLWyUekLicvhMMU00BxQtfzpI";
 const onToken = (token) => {
   setToken(token);
 };
 console.log(token);
useEffect(()=>{
  const req=async()=>{
    try {
      const res=await axios.post("http://localhost:5000/api/stripe/payment",{
        tokenId:token.id,
        amount:cart.total*100,
      })
      navigate("/success",{data:res.data});
    } catch (error) {
      console.log(error);
      toast.error("Failed to process payment. Please try again later.");
    }
  }
  token && cart.total>=1 && req();
},[token,cart.total,navigate])


const handleRemove=(productId)=>{
    toast.success("Item Removed From Cart!",toastOptions);
    dispatch(removerFromCart(productId))
}

const handleCLear=()=>{
    if (window.confirm('Are you sure want to clear the cart?')) {
        toast.error("Your cart has been cleared.",toastOptions);
        dispatch(clearCart())
    }
}

const handleClick=()=>{
    navigate(-1);
}

const toastOptions={
    position:"top-center",
    autoClose:5000,
    hideProgressBar:false,
    closeOnClick:true,
    pauseOnHover:true,
    draggable:true,
    theme:"dark"
   }
    
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>Your Bag</Title>
        <Top>
          <Button onClick={() => handleClick()}>CONTINUE SHOPPING</Button>

          <Content>
            <Text>Shopping Bag({cart.cart})</Text>
            <Text>Your Wishlist(0)</Text>
          </Content>
          <Button type="filled" onClick={() => handleCLear()}>
            CLEAR BAG
          </Button>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product) => (
              <Product>
                <ProductInfo>
                  <Image src={product.mainImg} />
                  <Details>
                    <Name>
                      <b>Product:</b>
                      {product.title}
                    </Name>
                    <ID>
                      <b>ID:</b>
                      {product._id}
                    </ID>
                    <Color color={product.color} />
                    <Size>
                      <b>Size:</b>
                      {product.size}
                    </Size>
                  </Details>
                </ProductInfo>
                <Price>
                  <Quantity>
                    <AddOutlinedIcon />
                    <ProductQuantity>{product.quantity}</ProductQuantity>
                    <RemoveOutlinedIcon />
                  </Quantity>
                  <ProductPrice>
                    $ {product.price * product.quantity}
                  </ProductPrice>
                </Price>
                <DeleteProduct>
                  <DeleteOutlinedIcon
                    onClick={() => handleRemove(product._id)}
                  />
                </DeleteProduct>
              </Product>
            ))}

            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryText>Subtotal</SummaryText>
              <SummaryPrice>$ {cart.total}</SummaryPrice>
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
              <SummaryPrice>$ {cart.total}</SummaryPrice>
            </SummaryItem>
            <StripeCheckout
              name="RAMA ECOM"
              description={`Your total is ${cart.total}`}
              amount={cart.total*100}
              billingAddress
              token={onToken}
              shippingAddress
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFeGGx49bYTTAQGQiHl5ohTAc03Vd0mfBmEA&usqp=CAU"
              stripeKey={key}
            >
              <Button>CHECKOUT NOW</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
      <ToastContainer />
    </Container>
  );
}

export default Cart