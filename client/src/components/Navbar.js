import React, { useState,useEffect } from 'react'
import styled from "styled-components"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Badge } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const Container=styled.div`
height:60px;
position:sticky;
top:0;
z-index:100;
transition:background 0.3s ease;
background:${props=>props.scrolled?'green':'white'};
`
const Wrapper=styled.div`
padding:10px 20px;
display:flex;
align-itens:center;
justify-content:space-between;
@media (max-width: 768px) {
    align-items: center;
  }
@media (max-width: 380px) {
    padding: 10px;
  }
`
const Left=styled.div`
flex:1;
display:flex;
align-items:center;
@media (max-width: 768px) {
    margin-right: 20px;
  }
`
const Language=styled.span`
    font-size:14px;
    cursor:pointer;
    @media (max-width: 768px) {
    display:none;
  }
`
const Right=styled.div`
flex:1;
display:flex;
align-items:center;
justify-content:flex-end;
`
const Center=styled.div`
flex:1;
text-align:center;
`
const Search=styled.div`
border:0.5px solid lightgray;
display:flex;
align-items:center;
margin-left:25px;
padding:5px;
@media (max-width: 768px) {
    margin-left: 0;
  }
`
const Input=styled.input`
border:none;
width:100%;
outline:none;
font-size:18px;
background:transparent;
color:black;
width:100%;
&::placeholder{
  color:darkgrey;
}
`
const Logo=styled.h1`
font-weight:bold;
`
const Cred=styled.div`
font-size:14px;
cursor:pointer;
margin-left:25px;
@media (max-width: 768px) {
    margin-left: 0;
    margin-right: 15px;
  }
`
const Navbar = () => {
  const [scrolled,setScrolled]=useState(false);
  
  const handleScroll=()=>{
    const offset=window.scrollY;
    if (offset > 60) {
      setScrolled(true);
      } else {
        setScrolled(false);
        }
        };
  
  
  useEffect(() => {
    window.addEventListener('scroll',handleScroll);
    return () => {
      window.removeEventListener('scroll',handleScroll);
    };
  }, []);

  
          

  return (
    <Container scrolled={scrolled}>

    <Wrapper>
    <Left>
    <Language>EN</Language>
    <Search style={{color:"gray",fontSize:16}}>
    <Input placeholder='Search'/>
    <SearchOutlinedIcon/>
    </Search>
    </Left>


    <Center>
    <Logo>ECOM.</Logo>
    </Center>


    <Right>
    <Cred>Register</Cred>
    <Cred>Sign In</Cred>
    <Cred>
 <Badge badgeContent={5} color="primary">
  <ShoppingCartOutlinedIcon color="action" />
    </Badge>    
    </Cred>
   
    </Right>
    </Wrapper>
   
    </Container>
  )
}

export default Navbar