import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { Badge } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../redux/userSlice';
import Search from './Search';
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Container = styled.div`
  height: 60px;
  position: relative;
  background-color: white;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 768px) {
    align-items: center;
  }
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    margin-right: 20px;
  }
`;

// const Language = styled.span`
//   font-size: 14px;
//   cursor: pointer;
//   @media (max-width: 768px) {
//     display: none;
//   }
// `;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media (max-width: 630px) {
    display: ${(props) => (props.open ? "flex" : "none")};
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 10px;
    top: 50px;
    background-color: white;
    width: 150px;
    height:200px;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
    z-index: 9;
    padding:5px;
    border-radius:20px;
  }
`;

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
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  @media (max-width: 768px) {
    margin: 10px 0;
  }
  @media (max-width: 630px) {
    font-size:22px;
    font-weight:bold;
  }
`;

const Hamburger = styled.div`
  display: none;
  @media (max-width: 630px) {
    display: flex;
    cursor: pointer;
  }
`;

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleClick = () => {
    localStorage.removeItem("userData");
    dispatch(logout());
  };

  const cart = useSelector((state) => state.cart.cart);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    console.log('isLoggedIn changed:', isLoggedIn);
  }, [isLoggedIn]);

  return (
    <Container>
      <Wrapper>
        <Left>
          {/* <Language>EN</Language> */}
          <Search />
        </Left>

        <Center>
          <StyledLink to="/">
            <Logo>VogueVault</Logo>
          </StyledLink>
        </Center>

        <Hamburger onClick={() => setOpen(!open)}>
          {open ? <CloseIcon /> : <MenuIcon />}
        </Hamburger>

        <Right open={open}>
          <StyledLink to="/register" style={{ textDecoration: "none", color: "inherit" }}>
            <Cred>Register</Cred>
          </StyledLink>

          {isLoggedIn ? (
            <Cred onClick={handleClick}>Sign Out</Cred>
          ) : (
            <StyledLink to="/login" style={{ textDecoration: "none", color: "inherit" }}>
              <Cred>Sign In</Cred></StyledLink>
          )}

          <StyledLink to="/cart">
            <Cred>
              <Badge badgeContent={cart} color="primary">
                <ShoppingCartOutlinedIcon color="action"/>
              </Badge>
            </Cred>
          </StyledLink>
        </Right>
      </Wrapper>
    </Container>
  );
}

export default Navbar;
