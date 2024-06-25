import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import styled from "styled-components";

const OrdersContainer = styled.div`
  padding: 20px;
`;

const OrderCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 20px;
  padding: 10px;
`;

const OrderTitle = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

const OrderDetails = styled.div`
  display: flex;
  justify-content: space-between;
`;

const OrderInfo = styled.div`
  margin-bottom: 5px;
`;

const Orders = () => {
  const user = useSelector((state) => state.user); 

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`/api/orders`, {
          headers: {
            Authorization: `Bearer ${user.token}`, 
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (user && user.token) {
      fetchOrders();
    }
  }, [user]);

  return (
    <OrdersContainer>
      <h1>Your Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <OrderCard key={order._id}>
            <OrderTitle>Order ID: {order._id}</OrderTitle>
            <OrderDetails>
              <div>
                <OrderInfo>Status: {order.status}</OrderInfo>
                <OrderInfo>Total Price: ${order.totalPrice}</OrderInfo>
              </div>
              <div>
                <OrderInfo>
                  Order Date: {new Date(order.createdAt).toLocaleDateString()}
                </OrderInfo>
                <OrderInfo>Address: {order.address}</OrderInfo>
              </div>
            </OrderDetails>
          </OrderCard>
        ))
      )}
    </OrdersContainer>
  );
};

export default Orders;
