import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { clearCart } from "../redux/cartSlice";

const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 2rem auto;
`;

const Title = styled.h2`
  color: #333;
`;

const Info = styled.p`
  color: #666;
  margin: 0.5rem 0;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 1rem;
  font-size: 1rem;

  &:hover {
    background-color: #0056b3;
  }
`;

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  const { orderId, totalAmount, shippingAddress, shippingName } =
    location.state || {};

  if (!orderId || !totalAmount || !shippingAddress || !shippingName) {
    return <div>Error: Missing order details.</div>;
  }

  return (
    <SuccessContainer>
      <Title>Payment Success!</Title>
      <Info>Your Payment ID: {orderId}</Info>
      <Info>Total Amount: ${totalAmount}</Info>
      <Info>
        Shipping Address: {shippingAddress.line1}, {shippingAddress.city},{" "}
        {shippingAddress.postal_code}, {shippingAddress.country}
      </Info>
      <Info>User Name: {shippingName}</Info>
      <Button onClick={() => navigate("/")}>Contine Shopping</Button>
      {/* <Button onClick={() => navigate("/orders")}>View Orders</Button> */}
    </SuccessContainer>
  );
};

export default Success;
