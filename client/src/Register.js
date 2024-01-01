import axios from 'axios'
import React,{ useState} from 'react'
import styled from "styled-components"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from "react-router-dom"

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
  const [username,setUsername]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [confirmPassword,setConfirmPassword]=useState("");
  const navigate=useNavigate()

  const toastOptions={
    position:"top-center",
    autoClose:5000,
    hideProgressBar:false,
    closeOnClick:true,
    pauseOnHover:true,
    draggable:true,
    theme:"dark"
   }

   const hadleValidation=()=>{
    if(email==="" || password==="" || confirmPassword==="" || username===""){
      toast.error("Please fill all fields!",toastOptions);
      return false;
    }
    else if(password!==confirmPassword){
      toast.error("Passwords do not match!",toastOptions)
      return false;
    }
    else if(username.length<3){
      toast.error("Username should be at least 3 characters long!",toastOptions)
      return false;
    }
    else if(password.length<8){
      toast.error("Password should be at least 8 characters long!",toastOptions)
      return false;
    }
      return true;
   }
  

  const handleRegister=async(e)=>{
    e.preventDefault();
    if(hadleValidation()){
      const res=await axios.post("http://localhost:5000/api/auth/register",{
      username,
      confirmPassword,
      email,
      password
      });
      if(res.status===501){
      toast.error(res.msg,toastOptions);
    }
    if(res.status===201){
    toast.success("User Registered Successfully!",toastOptions);
  }
  setTimeout(()=>{
    navigate('/login');
  },5000)
  
}
}
  return (
    <Container>
        <Wrapper>
            <Title>CREATE AN ACCOUNT</Title>
            <FORM>
                <Input placeholder ="username" 
                type='text'
                value={username} 
                onChange={(e)=>setUsername(e.target.value)}
                />
                <Input placeholder ="email" 
                type='email'
                value={email} 
                onChange={(e)=>setEmail(e.target.value)}
                />
                <Input placeholder ="password" 
                type="password"
                value={password} 
                onChange={(e)=>setPassword(e.target.value)}
                />
                <Input placeholder ="confirmPassword" 
                type="password"
                value={confirmPassword} 
                onChange={(e)=>setConfirmPassword(e.target.value)}
                />
                <Agreement>
                    BY creating an account, I consent to the processing of my personal data in accordanace with the <b>PRIVACY POLICY</b>
                </Agreement>
                <BUTTON onClick={handleRegister}>REGISTER</BUTTON>
            </FORM>
        </Wrapper>
        <ToastContainer/>
    </Container>
  )
}

export default Register