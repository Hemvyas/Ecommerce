import React from "react";
import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import {Link} from "react-router-dom"
const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f5fbfd;
  position: relative;
  overflow: hidden;
  cursor:pointer;
  &:hover img {
    transform: scale(1.1);
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 75%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled(LazyLoadImage)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease-in-out;
`;

const Details = styled.div`
  text-align: center;
`;

const Name = styled.h3`
  font-size: 18px;
  margin-bottom: 5px;
`;

const Price = styled.p`
  font-size: 16px;
  color: #333;
`;

const ProductItem = ({ item }) => {
  return (
    <Container>
      <Link
        to={`/product/${item._id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <ImageWrapper>
          <Image src={item.mainImg} alt={item.title} effect="blur" />
        </ImageWrapper>
        <Details>
          <Name>{item.title}</Name>
          <Price>${item.price}</Price>
        </Details>
      </Link>
    </Container>
  );
};

export default ProductItem;
