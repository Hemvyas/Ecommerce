import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Announcement from "./components/Announcement";
import Footer from "./components/Footer";
import styled from "styled-components";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart, removeFromCart } from "./redux/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { Helmet } from "react-helmet-async";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 20px;
`;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
  @media (max-width: 370px) {
    font-weight:200;
    font-size:27px;
  }
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Button = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background: ${(props) => (props.type === "filled" ? "black" : "transparent")};
  color: ${(props) => props.type === "filled" && "white"};
  @media (max-width: 370px) {
    padding:8px;
  }
`;
const Content = styled.div``;
const Text = styled.span`
  text-decoration: underline;
  cursor: pointer;
  @media (max-width: 514px) {
    display: none;
  }
`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 688px) {
    flex-direction: column;
  }
`;
const Info = styled.div`
  flex: 2;
  @media (max-width: 480px) {
    padding:10px;
  }
`;
const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;
const Product = styled.div`
  display: flex;
  justify-content: center;
`;
const ProductInfo = styled.div`
  flex: 2;
  display: flex;
`;
const Image = styled.img`
  width: 200px;
  heigght: 200px;
  margin: 10px 0px;
  @media (max-width: 480px) {
    width: 150px;
    height: 150px;
  }
  @media (max-width: 440px) {
    width: 140px;
    height: 140px;
  }
  @media (max-width: 400px) {
    width: 130px;
    height: 130px;
  }
  @media (max-width: 375px) {
    width: 90px;
    height: 130px;
  }
  @media (max-width: 325px) {
    width: 60px;
    height: 100px;
  }
`;
const Name = styled.span``;
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 400px) {
    padding: 10px;
  }
  @media (max-width: 390px) {
    font-size:16px;
  }
  @media (max-width: 330px) {
    font-size: 12px;
  }
`;
const ID = styled.span``;
const Size = styled.span``;
const Quantity = styled.span``;
const ProductPrice = styled.span``;
const Hr = styled.hr`
  background: #eee;
  border: none;
  height: 1px;
  @media (max-width: 688px) {
    display:none;
  }
`;
const SummaryTitle = styled.h1`
  font-weight: 200;
  @media (max-width: 340px) {
    font-weight:100;
    font-size:30px;
  }
`;
const SummaryPrice = styled.span``;
const SummaryText = styled.span``;
const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "20px"};
`;
const DeleteProduct = styled.span`
  cursor: pointer;
  position: relative;
  top: 190px;
  right: 50px;
  &:hover {
    color: #ff6347;
  }
  @media (max-width: 480px) {
    right: 10px;
    top: 120px;
  }
  @media (max-width: 325px) {
    right: 10px;
    top: 90px;
  }
`;

const EmptyCartMessage = styled.div`
  text-align: center;
  font-size: 1.5rem;
  color: #555;
  padding: 50px 0;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const [token, setToken] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const key =
    "pk_test_51OOKNlSJrhaILpp92Nl5MEik6Q00mAekKGiVNGiwqWLJ7Q7B0emjITRdKvSBOnImsjgz0t7U8MLWyUekLicvhMMU00BxQtfzpI";
  const onToken = (token) => {
    setToken(token);
  };

  useEffect(() => {
    const req = async () => {
      try {
        const res = await axios.post(
          "https://ecommerce-brown-one.vercel.app/api/stripe/payment",
          {
            tokenId: token.id,
            amount: cart.total * 100,
            shippingAddress: {
              line1: token.card.address_line1,
              city: token.card.address_city,
              postal_code: token.card.address_zip,
              country: token.card.address_country,
            },
            shippingName: token.card.name,
          }
        );
        const paymentId = res.data.id;
        const totalAmount = res.data.amount / 100;
        navigate("/success", {
          state: {
            paymentId,
            totalAmount,
            shippingAddress: {
              line1: token.card.address_line1,
              city: token.card.address_city,
              postal_code: token.card.address_zip,
              country: token.card.address_country,
            },
            shippingName: token.card.name,
          },
        });
      } catch (error) {
        console.log(error);
        toast.error("Failed to process payment. Please try again later.");
      }
    };
    token && cart.total >= 1 && req();
  }, [token, cart.total, navigate]);

const handleLogin=async()=>{
      navigate("/login");
}
  const handleCheckout=async()=>{
    const token=user.token;
    try {
      const res = await axios.post(
        "https://ecommerce-brown-one.vercel.app/api/order",
        {
          userId: user.other._id,
          products: cart.products,
          totalPrice: cart.total,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      console.log(res.data);
      dispatch(clearCart());
    } catch (error) {
       console.error("Error creating order:", error);
    }
  }

  const handleRemove = (productId) => {
    toast.success("Item Removed From Cart!", toastOptions);
    dispatch(removeFromCart(productId));
  };

  const handleClear = () => {
    if (window.confirm("Are you sure want to clear the cart?")) {
      toast.error("Your cart has been cleared.", toastOptions);
      dispatch(clearCart());
    }
  };

  const handleClick = () => {
    navigate(-1);
  };

  const toastOptions = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const cartTotal=cart.total;
  let shippingFee=2;
  let discount=0;
  if(cartTotal>5000 && cartTotal<10000){
    shippingFee=0;
    discount=cartTotal*0.10;
  }else if(cartTotal>10000){
    shippingFee=0;
    discount=cartTotal*0.20;
  }
  else{
    shippingFee=2;
    discount=0;
  }

  const total=cartTotal-discount+shippingFee;

  return (
    <Container>
      <Helmet>
        <title>Shopping bag | VogueVault</title>
        <meta
          name="description"
          content="View and manage items in your cart."
        />
      </Helmet>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>Your Bag</Title>
        <Top>
          <Button onClick={() => handleClick()}>CONTINUE SHOPPING</Button>
          <Content>
            <Text>Shopping Bag({cart.products.length})</Text>
            <Text>Your Wishlist(0)</Text>
          </Content>
          <Button type="filled" onClick={() => handleClear()}>
            CLEAR BAG
          </Button>
        </Top>
        {cart.products.length === 0 ? (
          <EmptyCartMessage>Your shopping bag is empty.</EmptyCartMessage>
        ) : (
          <Bottom>
            <Info>
              {cart.products.map((product) => (
                <Product key={product._id}>
                  <ProductInfo>
                    <Image src={product.mainImg} />
                    <Details>
                      <Name>
                        <b>Product:</b> {product.title}
                      </Name>
                      <ID>
                        <b>ID:</b> {product._id}
                      </ID>

                      <Size>
                        <b>Size:</b> {product.size}
                      </Size>
                      <Quantity>
                        <b>Quantity:</b> {product.quantity}
                      </Quantity>
                      <ProductPrice>
                        <b>Price:</b> $ {product.price * product.quantity}
                      </ProductPrice>
                    </Details>
                  </ProductInfo>
                  <DeleteProduct>
                    <DeleteOutlinedIcon
                      onClick={() => handleRemove(product._id)}
                    />
                  </DeleteProduct>
                </Product>
              ))}
              <Hr />
            </Info>
            <Summary>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>
              <SummaryItem>
                <SummaryText>Subtotal</SummaryText>
                <SummaryPrice>$ {cart.total.toFixed(2)}</SummaryPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryText>Shipping Fee</SummaryText>
                <SummaryPrice>${shippingFee}</SummaryPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryText>Discount</SummaryText>
                <SummaryPrice>$ -{discount.toFixed(2)}</SummaryPrice>
              </SummaryItem>
              <SummaryItem type="total">
                <SummaryText>Total</SummaryText>
                <SummaryPrice>$ {total.toFixed(2)}</SummaryPrice>
              </SummaryItem>
              {user ? (
                <>
                  <StripeCheckout
                    name="RAMA ECOM"
                    description={`Your total is ${cart.total}`}
                    amount={cart.total * 100}
                    billingAddress
                    token={onToken}
                    shippingAddress
                    image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLeqFAy5MP-HSA6P1-ERIzL-RV61tlji9O5j8NgJVRcp95EGMp-g9vgo0WcD8ZukxQlS4&usqp=CAU"
                    stripeKey={key}
                  >
                    <Button type="filled" onClick={handleCheckout}>
                      CHECKOUT NOW
                    </Button>
                  </StripeCheckout>
                </>
              ) : (
                <>
                  <Button type="filled" onClick={handleLogin}>
                    LogIn to Checkout
                  </Button>
                </>
              )}
            </Summary>
          </Bottom>
        )}
      </Wrapper>
      <Footer />
      <ToastContainer />
    </Container>
  );
};

export default Cart;
