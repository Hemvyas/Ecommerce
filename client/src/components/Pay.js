import React, { useEffect, useState } from 'react'
import StripeCheckout from "react-stripe-checkout"
import axios from "axios"

const key ="pk_test_51OOKNlSJrhaILpp92Nl5MEik6Q00mAekKGiVNGiwqWLJ7Q7B0emjITRdKvSBOnImsjgz0t7U8MLWyUekLicvhMMU00BxQtfzpI";

const Pay = () => {
    const [token,setToken]=useState(null)
    const onToken=(token)=>{
        console.log(token);
        setToken(token);
    }
    useEffect(()=>{
        const payment=async()=>{
            try {
                const res=await axios.post("http://localhost:5000/api/stripe/payment",{
                tokenId:token.id,
                amount:2000,            
            })   
            console.log(res.data);
            } catch (error) {
                console.log(error);
            }
            
        } 
        if (token) payment();
    },[token])
  return (
    <div style={{
        height:"100vh",
        display:"flex",
        alignItems:"center",
        justifyContent:"center"
    }}>
    <StripeCheckout
    name='RAMA ECOM'
    description="Your total is $20"
    amount={2000}
    billingAddress
    token={onToken}
    shippingAddress
    image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFeGGx49bYTTAQGQiHl5ohTAc03Vd0mfBmEA&usqp=CAU'
    stripeKey={key}
    >

  
        <button style={{
            border:"none",
            width:120,
            borderRadius:5,
            padding:"20px",
            backgroundColor:"black",
            color:"white",
            fontWeight:"600",
            cursor:"pointer"
        }}>
    PAY NOW
        </button>
        </StripeCheckout>
    </div>
  )
}

export default Pay