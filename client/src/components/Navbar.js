import React, { useState,useEffect } from 'react'
import styled from "styled-components"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Badge } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const Container=styled.div`
height:60px;
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
  const [search,setSearch]=useState("")
  const [products,setProducts]=useState([])
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const navigate=useNavigate();


  useEffect(()=>{
    const getProducts=async()=>{
      try {
        const res=await axios.get(`http://localhost:5000/api/category/product?search=${search}`)
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getProducts();
  },[search])


const handleSearch=()=>{
  const searchQuery = debouncedSearchQuery.trim();

  if (searchQuery === "") {
    setSearch([]);
    return;
  }
  const searchProducts=products.filter((item)=>{
    return (
    item.title.toLowerCase().includes(debouncedSearchQuery.toLocaleLowerCase())||
    item.types.toLowerCase().includes(debouncedSearchQuery.toLowerCase())||
    item.color.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    )
  })    
  navigate({
    pathname:'/search',
    state:{searchResults:searchProducts}
  });
  console.log(searchProducts);  
}

useEffect(() => {
  const debounceTimer = setTimeout(() => {
    setDebouncedSearchQuery(search);
  }, 300);

  return () => {
    clearTimeout(debounceTimer);
  };
}, [search]);

 
  const cart=useSelector(state=>state.cart.cart); 
 
  
  return (
    <Container>
    <Wrapper>
    <Left>
    <Language>EN</Language>
    <Search style={{color:"gray",fontSize:16}}>
    <Input placeholder='Search' value={search} onChange={(e)=>setSearch(e.target.value)} onBlur={handleSearch}/>
    <SearchOutlinedIcon/>
    </Search>
    </Left>


    <Center>
    <Logo>ECOM.</Logo>
    </Center>


    <Right>
    <Link to='/register'>
    <Cred>Register</Cred>
    </Link>
    
    <Link to="/login">
    <Cred>Sign In</Cred>
    </Link>
    
    <Link to='/cart'>
    <Cred>
 <Badge badgeContent={cart} color="primary">
  <ShoppingCartOutlinedIcon color="action"/>
    </Badge>    
    </Cred>
    </Link>
    </Right>
    </Wrapper>
    </Container>
  )
}

export default Navbar