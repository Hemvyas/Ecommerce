import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Navbar from './components/Navbar'
import Announcement from './components/Announcement'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { addToCart } from './redux/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import ProductItem from './components/ProductItem'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Container=styled.div`

`
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  @media (max-width: 990px) {
    padding:10px;
    flex-direction:column
  }
`;
const ImgContainer=styled.div`
flex:1;
position:relative;
&:hover .colorImg{
  opacity:1;
}
`
const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  @media (max-width: 990px) {
    height: 60vh;
  }
  @media (max-width: 400px) {
    height: 40vh;
  }
`;
const ColorImg = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  transition: 0.3s opacity background ease-in-out;
  @media (max-width: 990px) {
    height: 60vh;
  }
  @media (max-width: 400px) {
    height: 40vh;
  }
`;
const Title=styled.h1`
font-weight:600;
`
const Desc=styled.p`
margin:20px 0px;
`;
const Types=styled.p`
font-weight:100;
font-size:21px;
`
const Price=styled.p`
font-weight:100;
font-size:40px;
`
const Info = styled.div`
  flex: 1;
  padding: 0px 50px;
  @media (max-width: 390px) {
    padding:10px;
  }
`;
const FilterContainer=styled.div`
display:flex;
justify-content:space-between;
margin:20px 0px;
width:50%;
`
const Filter=styled.div`
display:flex;
align-items:center;
`
const FilterTitle=styled.span`
font-size:20px;
font-weight:200;
`
const FilterColor=styled.div`
width:20px;
height:20px;
border-radius:50%;
background:${props=>props.color};
margin:0px 5px;
cursor:pointer;
border:3px solid #000;
`
const FilterSize=styled.p`
margin-left:10px;
padding:6px;
`
const AddContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50%;
  @media (max-width: 390px) {
    width:100%;
  }
`;
const Quantity=styled.div`
display:flex;
align-items:center;
font-weight:700;
`
const Total=styled.div`
width:30px;
height:30px;
border-radius:10px;
border:3px solid teal;
display:flex;
justify-content:center;
align-items:center;
margin:0px 5px;
`
const Button=styled.button`
padding:15px;
border:1px solid teal;
cursor:pointer;
font-weight:500;
&:hover{
  background:#f4f6ff;
  color:teal;
  }
`
const FilterSizeOption=styled.option`

`
const Products=styled.div`
display:flex;
padding:20px;
flex-wrap:wrap;
justify-content:space-between;
`
const Recommendation=styled.div`
background:#fbf0f4;
padding:10px;
`
const Show=styled.span`
cursor:pointer;
font-size:15px;
text-decoration:underline;
`



const Product = () => {
  const location=useLocation();
    const user = useSelector((state) => state.user.currentUser);
  const id=location.pathname.split("/")[2];
  const [product,setProduct]=useState({});
  const [quantity,setQuantity]=useState(1);
   const [recomendedProducts,setRecommendedProducts]=useState([]);
   const [show, setShow] = useState(false);
  // const [likedProducts, setLikedProducts] = useState([]);
   const dispatch=useDispatch();

   const toastOptions={
    position:"top-center",
    autoClose:3000,
    hideProgressBar:false,
    closeOnClick:true,
    pauseOnHover:true,
    draggable:true,
    theme:"dark"
   }

  //  const token=user.token;
  //  const userId=user.other._id;
  useEffect(()=>{
    const fetchProduct=async()=>{
      try {
        const res = await axios.get(
          `https://ecommerce-brown-one.vercel.app/api/product/${id}`
        );
        setProduct(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProduct();
  },[id])

  useEffect(() => {
    const recomend=async()=>{
      try {
        const res = await axios.get(
          `https://ecommerce-brown-one.vercel.app/api/category/recomend/${id}`
        );
        setRecommendedProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    recomend();
  }, [id])


// useEffect(() => {
//   const fetchLikedProducts = async () => {
//     try {
//       const config = {
//         headers: {
//         "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       };

//       const res = await axios.get(
//         `https://ecommerce-brown-one.vercel.app/api/user/likes/${userId}`,
//         config
//       );
//       setLikedProducts(res.data.likes);
//       console.log(res.data);
//     } catch (error) {
//       console.error("Error fetching liked products:", error);
//     }
//   };

//   fetchLikedProducts();
// }, [userId, token]);

  // const handleToggleLike = async () => {
  //   try {
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     };

  //     if (likedProducts.includes(id)) {
  //       const res = await axios.put(
  //         `https://ecommerce-brown-one.vercel.app/api/user/dislike/${id}`,
  //         {},
  //         config
  //       );
  //       setLikedProducts(res.data.user.likes);
  //       toast.info("Product removed from likes", toastOptions);
  //     } else {
  //       const res = await axios.put(
  //         `https://ecommerce-brown-one.vercel.app/api/user/like/${id}`,
  //         {},
  //         config
  //       );
  //       setLikedProducts(res.data.user.likes);
  //       toast.success("Product added to likes", toastOptions);
  //     }
  //   } catch (error) {
  //     console.error("Error toggling like:", error);
  //   }
  // };

  const handleclick=()=>{
    toast.success("Item Added To Cart!!!",toastOptions);
    dispatch((addToCart({...product,quantity})))
  }
  const handleQuantity=(type)=>{
    if(type==="inc"){
      setQuantity(quantity+1);
    }
    else{
     quantity>1 && setQuantity(quantity-1)
    }
  }

const maxDesc=400;

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={product.mainImg} />
          <ColorImg className="colorImg" src={product.colorImg} />
        </ImgContainer>
        <Info>
          <Title>{product.title}</Title>
          <Desc>
            <h4>Description:</h4>
            {product.desc?.length > maxDesc && !show
              ? `${product.desc?.substring(0, maxDesc)}...`
              : product.desc}
            {product.desc?.length > maxDesc && (
              <Show onClick={() => setShow(!show)}>
                {show ? "Show Less" : "Show More"}
              </Show>
            )}
          </Desc>
          <Types>Type:{product.types}</Types>
          <Price>$ {product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              <FilterColor color={product.color} key={product.color} />
            </Filter>

            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize>
                {product.size && (
                  <FilterSizeOption>{product.size}</FilterSizeOption>
                )}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <Quantity>
              <RemoveOutlinedIcon onClick={() => handleQuantity("dec")} />
              <Total>{quantity}</Total>
              <AddOutlinedIcon onClick={() => handleQuantity("inc")} />
            </Quantity>
            <Button onClick={handleclick}>Add To Cart</Button>
            {/* <Button onClick={handleToggleLike}>
              {likedProducts.includes(product._id)
                ? "Remove from Likes"
                : "Add to Likes"}
            </Button> */}
          </AddContainer>
        </Info>
      </Wrapper>

      <Recommendation>
        <Title>Recomended Products</Title>
        <Products>
          {recomendedProducts.map((item) => {
            return <ProductItem item={item} key={item.id} />;
          })}
        </Products>
      </Recommendation>

      <Newsletter />
      <Footer />
      <ToastContainer />
    </Container>
  );
}

export default Product