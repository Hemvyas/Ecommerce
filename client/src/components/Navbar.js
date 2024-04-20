import React, { useEffect } from 'react'
import styled from "styled-components"
import { Badge } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../redux/userSlice';
import Search from './Search';
const Container = styled.div`
  height: 60px;
`;
const Wrapper=styled.div`
padding:10px 20px;
display:flex;
align-itens:center;
justify-content:space-between;
@media (max-width: 768px) {
    align-items: center;
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
@media (max-width: 630px){
  display:none;
}
`
const Center = styled.div`
  flex: 1;
  text-align: center;
  @media (max-width: 620px) {
    flex: 12;
  }
`;


const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit; 
`;
const Logo = styled.h1`
  font-weight: bold;
  @media (max-width: 390px) {
    font-size: 24px;
  }
`;
const Cred = styled.div`
font-size:14px;
cursor:pointer;
margin-left:25px;
`;
const Navbar = () => {
  const dispatch=useDispatch();

const handleClick=()=>{
  localStorage.removeItem("userData");
  dispatch(logout());
}
 
  const cart=useSelector(state=>state.cart.cart); 
  const isLoggedIn=useSelector(state=>state.user.isLoggedIn)

  useEffect(() => {
    console.log('isLoggedIn changed:', isLoggedIn);
  }, [isLoggedIn]);

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <Search/>
        </Left>

        <Center>
          <StyledLink to="/">
            <Logo>VogueVault</Logo>
          </StyledLink>
        </Center>

        <Right>
          <Link
            to="/register"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Cred>Register</Cred>
          </Link>

          {isLoggedIn ? (
            <Cred onClick={handleClick}>Sign Out</Cred>
          ) : (
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Cred>Sign In</Cred>
            </Link>
          )}

          <Link to="/cart">
            <Cred>
              <Badge badgeContent={cart} color="primary">
                <ShoppingCartOutlinedIcon color="action" />
              </Badge>
            </Cred>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
}

export default Navbar