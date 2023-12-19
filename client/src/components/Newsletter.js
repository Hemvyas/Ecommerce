import React from 'react'
import styled from 'styled-components'
import SendIcon from '@mui/icons-material/Send';
const Container=styled.div`
height:60vh;
background-color:#fcf5f5;
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;
`
const Title=styled.h1`
font-size:70px;
margin-bottom:20px;
`
const Description=styled.div`
font-size:24px;;
font-weight:300;
margin-bottom:20px;
`
const InputContainer=styled.div`
width:50%;
height:45px;
background:#fff;
display:flex;
justify-content:space-between;
border:1px solid lightgray;
`
const Input=styled.input`
flex:8;
border:none;
padding-left:20px;
`
const Button=styled.button`
flex:1;
color:#fff;
background:teal;
cursor:pointer;
border-radius:3px;
border:none;
`
const Newsletter = () => {
  return (
    <Container>
        <Title>NewsLetter</Title>
        <Description>
        Subscribe to our newsletter and get the latest updates straight into your inbox!
        </Description>
        <InputContainer>
            <Input placeholder='Enter Email'/>
            <Button>
                <SendIcon/>
            </Button>
        </InputContainer>
    </Container>
  )
}

export default Newsletter