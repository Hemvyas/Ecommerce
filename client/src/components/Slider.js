import React, { useState,useEffect } from 'react'
import styled from 'styled-components'
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { apiData } from '../data';
const Container = styled.div`
  display: flex;
  height: calc(100vh - 100px);
  position: relative;
  margin-top:10px;
  overflow: hidden;
`;
const Arrow=styled.div`
width:50px;
height:50px;
background:#fff7f7;
border-radius:50%;
display:flex;
justify-content:center;
align-items:center;
cursor:pointer;
position:absolute;
top:0;
bottom:0;
margin:auto;
left:${props=>props.direction ==="left" && "10px"};
right:${props=>props.direction ==="right" && "10px"};
opacity:0.5;
z-index:1;
`
const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  transform: translateX(-${(props) => props.translate}vw);
  transition: all 1.5s ease-in-out;
`;
const Slide = styled.div`
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: #${(props) => props.bg};
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const ImgContainer = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
  object-position:center;
  @media (max-width: 500px) {
    object-fit:cover;
  }
`;

const Info=styled.div`
flex:1;
padding:50px;
`
const Title = styled.h1`
  font-size: 70px;
  @media (max-width: 600px) {
    font-size: 60px;
  }
  @media (max-width: 500px) {
    font-size: 50px;
  }
  @media (max-width: 420px) {
    font-size: 40px;
  }
  @media (max-width: 350px) {
    font-size: 33px;
  }
`;
const Desc = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
  @media (max-width: 768px) {
    margin: 20px 0px;
  }
  @media (max-width: 600px) {
    font-size: 15px;
  }
  @media (max-width: 500px) {
    font-size: 14px;
  }
  @media (max-width: 420px) {
    font-size:12px;
    margin:12px 0;
  }
`;
const Button=styled.button`
padding:10px;
font-size:20px;
background:transparent;
cursor:pointer;
`
const Slider = () => {
    const [currentIndex,setCurrentIndex]=useState(0);

    const handlePrev=()=>{
        setCurrentIndex((prevIndex)=>(prevIndex===0?apiData.length-1:prevIndex-1))
    }

    const handleNext=()=>{
        setCurrentIndex((prevIndex)=>(prevIndex===apiData.length-1?0:prevIndex+1))
    }

    useEffect(() => {
        const interval = setInterval(() => {
          handleNext();
        }, 5000);
        
        return () => clearInterval(interval); 
      }, [currentIndex]);

  return (
    <Container>
    <Arrow direction="left" onClick={handlePrev}>
    <ArrowBackIosNewOutlinedIcon/>
    </Arrow>
    <Wrapper translate={currentIndex*100}>
    {apiData.map(item=>(
        <Slide bg={item.bg} key={item.id}>
    <ImgContainer>
        <Img src={item.img}/>
    </ImgContainer>
    <Info>
        <Title>{item.title}</Title>
        <Desc>{item.desc}</Desc>
        <Button>SHOP NOW</Button>
    </Info>
    </Slide>
    ))}
    
    </Wrapper>
    <Arrow direction="right" onClick={handleNext}>
    <ArrowForwardIosOutlinedIcon/>
    </Arrow>
    </Container>
  )
}

export default Slider