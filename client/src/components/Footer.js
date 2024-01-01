import React from 'react'
import styled from 'styled-components'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import RoomIcon from '@mui/icons-material/Room';
import PhoneIcon from '@mui/icons-material/Phone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
const Container=styled.div`
display:flex;
`
const Left=styled.div`
flex:1;
display:flex;
flex-direction:column;
padding:20px;
`
const Logo=styled.h1`

`
const Desc=styled.p`
margin:20px 0px;
`
const SocialMedia=styled.div`
display:flex;
`
const Icon =styled.div`
width:40px;
height:40px;
border-radius:50%;
color:#fff;
background:#${props=>props.color};
display:flex;
justify-content:center;
align-items:center;
margin-right:20px;
cursor:pointer;
`
const Center=styled.div`
flex:1;
padding:20px;
`
const Title=styled.h3`
margin-bottom:30px;
`
const List=styled.ul`
margin:0;
padding:0;
list-style:none;
display:flex;
flex-wrap:wrap;
`
const Items=styled.li`
width:50%;
margin-bottom:10px;
`
const Right=styled.div`
flex:1;
padding:20px;
`
const Contact=styled.div`
margin-bottom:20px;
display:flex;
align-items:center;
`
const Payment=styled.img`
width:50%;
`
const Footer = () => {
  return (
    <Container>
    <Left>
        <Logo>VogueVault</Logo>
        <Desc>
            ©2023 VogueVault Inc. All rights reserved.<br/>
        </Desc>
        <SocialMedia>
            <Icon color='385999'>
                <FacebookIcon />
            </Icon>
            <Icon color='E4405F'>
                <InstagramIcon/>
            </Icon>
            <Icon color='55ACEE'>
                <TwitterIcon/>
            </Icon>
            <Icon color='E60023'>
                <YouTubeIcon/>
            </Icon>
        </SocialMedia>
    </Left>
    <Center>
        <Title>Customer Service</Title>
        <List>
            <Items>FAQs</Items>
            <Items>Shipping & Returns</Items>
            <Items>Man Fashion</Items>
            <Items>Wishlist</Items>
            <Items>Cart</Items>
            <Items>Home</Items>
            <Items>Woman Fashion</Items>
            <Items>My account</Items>
            <Items>Terms</Items>
            <Items>Accesories</Items>
        </List>
    </Center>
    <Right>
    <Title>Contact</Title>
    <Contact>
        <RoomIcon style={{marginRight:"10px"}}/> 541 Wall Street, Whitefield
    </Contact>
    <Contact>
       <PhoneIcon style={{marginRight:"10px"}}/> +91 212 17 14
    </Contact>
    <Contact>
       <MailOutlineIcon style={{marginRight:"10px"}}/> ecom@gmail.com
    </Contact>
    <Payment src="https://remtica.com/wp-content/uploads/2022/03/payment-methods.jpg"/>
    </Right>
    </Container>
  )
}

export default Footer