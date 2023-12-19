import React from 'react'
import styled from "styled-components"

const Container=styled.div`
width:100vw;
height:100vh;
background:linear-gradient(rgba(255,255,255,0.5),rgba(255,255,255,0.5)),url("https://c4.wallpaperflare.com/wallpaper/253/638/452/light-background-hd-wallpaper-thumb.jpg")center;

background-size:cover;
display:flex;
justify-content:center;
align-items:center;
`
const Wrapper=styled.div`
padding:20px;
width:40%;
background:#fff;

`
const Title=styled.h1`
font-size:24px;
font-weight:500;
`
const Input=styled.input`
flex:1;
padding:10px;
min-width:40%;
margin:20px 10px 0px 0px;
`
const Agreement=styled.span`
font-sixe:12px;
margin:20px 0px;
`
const FORM=styled.form`
display:flex;
flex-wrap:wrap;
`
const BUTTON=styled.button`
padding:15px 20px;
width:40%;
border:none;
background:teal;
color:#fff;
cursor:pointer;
`
const Register = () => {
  return (
    <Container>
        <Wrapper>
            <Title>CREATE AN ACCOUNT</Title>
            <FORM>
                <Input placeholder ="name"/>
                <Input placeholder ="lastName"/>
                <Input placeholder ="username"/>
                <Input placeholder ="email"/>
                <Input placeholder ="password"/>
                <Input placeholder ="confirmPassword"/>
                
                <Agreement>
                    BY creating an account, I consent to the processing of my personal data in accordanace with the <b>PRIVACY POLICY</b>
                </Agreement>
                <BUTTON>REGISTER</BUTTON>
            </FORM>
        </Wrapper>
    </Container>
  )
}

export default Register