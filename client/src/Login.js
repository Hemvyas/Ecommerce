import React from 'react'
import styled from "styled-components"

const Container=styled.div`
width:100vw;
height:100vh;
background:linear-gradient(rgba(255,255,255,0.5),rgba(255,255,255,0.5)),url("https://st2.depositphotos.com/2124221/46127/i/450/depositphotos_461279104-stock-photo-abstract-geometric-background-poly-pattern.jpg");
background-size:cover;
display:flex;
justify-content:center;
align-items:center;
`
const Wrapper=styled.div`
padding:20px;
width:25%;
background:#fff;
`
const Title=styled.h1`
font-size:24px;
font-weight:500;
`
const Input=styled.input`
flex:1;
margin:10px 0px;
padding:10px;
min-width:40%;
`

const FORM=styled.form`
display:flex;
flex-direction:column;
`
const BUTTON=styled.button`
padding:15px 20px;
width:40%;
border:none;
background:teal;
color:#fff;
cursor:pointer;
margin-bottom:10px;
`
const Link=styled.a`
margin:5px 0px;
text-decoration:underline;
cursor:pointer;
font-size:14px;
`
const Login = () => {
  return (
    <Container>
        <Wrapper>
            <Title>SIGN IN</Title>
            <FORM>
                <Input placeholder ="username"/>
                <Input placeholder ="password"/>
                <BUTTON>LOGIN</BUTTON>
                <Link>Forget Passoword?</Link>
                <Link>Create a New Account</Link>
            </FORM>
        </Wrapper>
    </Container>
  )
}

export default Login