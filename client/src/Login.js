import React, { useState } from 'react'
import styled from "styled-components"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch,useSelector } from 'react-redux'
import { login } from './redux/login';
import {Link} from "react-router-dom"
import { Helmet } from 'react-helmet-async';
const Container=styled.div`
width:100vw;
height:100vh;
background:linear-gradient(rgba(255,255,255,0.5),rgba(255,255,255,0.5)),url("https://st2.depositphotos.com/2124221/46127/i/450/depositphotos_461279104-stock-photo-abstract-geometric-background-poly-pattern.jpg");
background-size:cover;
display:flex;
justify-content:center;
align-items:center;
`
const Wrapper = styled.div`
  padding: 20px;
  width: 40%;
  background: #fff;
  @media (max-width: 450px) {
    padding: 30px;
    width: 45%;
  }
  @media (max-width: 350px) {
    padding: 40px;
    width: 50%;
  }
`;
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
const BUTTON = styled.button`
  padding: 15px 20px;
  width: 40%;
  border: none;
  background: teal;
  color: #fff;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
  @media (max-width: 460px) {
    width: 50%;
  }
  @media (max-width: 330px) {
    width: 55%;
  }
`;
const Links=styled.div`
margin:5px 0px;
cursor:pointer;
font-size:14px;

`
const Error=styled.span`
color:red;
@media (max-width:330px){
  font-size:15px;
}
`
const Login = () => {
  const dispatch=useDispatch();
  const { error,isLoggedIn } = useSelector((state) => state.user);
  const [email,setEmail]=useState("")
  const [password,setPassword] = useState("")
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
    if(email==="" || password===""){
      toast.error("Please fill all fields!",toastOptions);
      return false;
    }
    else if(password.length<8){
      toast.error("Password should be at least 8 characters long!",toastOptions)
      return false;
    }
      return true;
   }


const handleLogin = async (e) => {
  e.preventDefault();

  if(hadleValidation())
  {
    toast.success("User LoggedIn Successfully!",toastOptions);
    await login(dispatch,{email,password}) 
  }

}

  return (
    <Container>
      <Helmet>
        <title>LogIn | VogueVault</title>
        <meta name="description" content="Login to access your account." />
      </Helmet>
      <Wrapper>
        <Title>SIGN IN</Title>
        <FORM>
          <Input
            placeholder="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <BUTTON onClick={handleLogin} disabled={isLoggedIn}>
            LOGIN
          </BUTTON>
          {error && <Error>Something went wrong!</Error>}
          <Links>
            <Link to="/register" style={{ color: "inherit" }}>
              Create a New Account
            </Link>
          </Links>
        </FORM>
      </Wrapper>
      <ToastContainer />
    </Container>
  );
}

export default Login