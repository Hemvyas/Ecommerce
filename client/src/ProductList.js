import React, { useState,useEffect } from 'react'
import Navbar from "./components/Navbar"
import Announcement from "./components/Announcement"
import Newsletter from "./components/Newsletter"
import Footer from "./components/Footer"
import styled from 'styled-components'
import axios from 'axios';
import { useLocation } from 'react-router-dom'
import ProductItem from './components/ProductItem'
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import { useSelector } from 'react-redux'
import CircularProgress from "@mui/material/CircularProgress";


const Container=styled.div`
`
const Title=styled.h1`
margin:20px;
`
const FilterContainer=styled.div`
display:flex;
justify-content:space-between;
`
const Filter = styled.div`
  margin: 20px;
  @media (max-width: 530px) {
    display:flex;
    flex-direction:column;
    width:0 20px;
  }
`;
const Text = styled.div`
  font-size: 17px;
  font-weight: 600;
  margin-right: 20px;
  @media (max-width: 530px) {
    margin-right:0px;
  }
`;
const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  @media (max-width: 530px) {
    margin:10px 0;
  }
`;
const Option=styled.option`
`
const Content=styled.div`
display:flex;
justify-content:space-between;
flex-wrap:wrap;
padding:20px;
`
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
left:${props=>props.direction ==="left" && "200px"};
right:${props=>props.direction ==="right" && "200px"};
opacity:0.5;
z-index:1;
`
const Pagination=styled.div`
position:relative;
`
const Page=styled.div`
position:absolute;
left:50%;
bottom:8%;
`
const Loading = styled.div`
  position: absolute;
  left: 50%;
  top: 20%;
  transform: translateX(-20%, -50%);
  font-size: 110px;
`;
const ProductList = () => {
    const location=useLocation();
    const category = location.pathname.split('/')[2];
    const [error, setError] = useState(null);
    const [sort,setSort]=useState("newest")
    const [color, setColor] = useState("color");
    const [types, setTypes] = useState("types");
    const [size, setSize] = useState("size");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [filteredProducts,setFilteredProducts]=useState([]);
    // const [products, setProducts] = useState([]);
    const [loading,setLoading]=useState(false);
    const searchQuery=useSelector(state=>state.searchQuery)
    useEffect(() => {
        const getProducts=async()=>{
          setLoading(true);
          try {
           const res = await axios
             .get(
               `https://ecommerce-brown-one.vercel.app/api/category/cat/${category}?page=${page}&limit=${limit}`
             )
            let filteredProducts=[...res.data.products];
            if(color!=="color"){
              filteredProducts = filteredProducts && filteredProducts.filter(
                (product) => product.color === color);
            }
            if(types!=="types"){
              filteredProducts =
                filteredProducts &&
                filteredProducts.filter((product) => product.types === types);
            }
            if (size !== "size") {
              filteredProducts =
                filteredProducts &&
                filteredProducts.filter((product) => product.size === size);
            }
            if(searchQuery)
            {
              filteredProducts = 
              filteredProducts &&  
              filteredProducts.filter((product)=>
              product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              product.types.toLowerCase().includes(searchQuery.toLowerCase()))
            }
            filteredProducts=filteredProducts.sort((a,b)=>sort==="asc"?a.price-b.price:b.price-a.price)
            console.log(filteredProducts);
           if (
             filteredProducts &&
             filteredProducts &&
             Array.isArray(filteredProducts)
           ) {
             setFilteredProducts(filteredProducts);
           } 
            setTotalPages(res.data.totalPages)
          } catch (error) {
            console.log(error);
            setError(error);
          }
            setLoading(false);
          }
        getProducts();
    }, [category, page, sort,color,types,size,limit,searchQuery]);

    return (
      <Container>
        <Navbar />
        <Announcement />
        <Title>{category} Section</Title>
        <FilterContainer>
          <Filter>
            <Text>Filter Products:</Text>
            <Select
              name="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            >
              <Option value="">Color</Option>
              <Option value="White">White</Option>
              <Option value="Black">Black</Option>
              <Option value="Maroon">Maroon</Option>
              <Option value="Yellow">Yellow</Option>
              <Option value="Navy">Navy</Option>
              <Option value="Red">Red</Option>
              <Option value="Orange">Orange</Option>
              <Option value="Gold">Gold</Option>
              <Option value="Aqua">Aqua</Option>
              <Option value="Gray">Gray</Option>
              <Option value="Green">Green</Option>
            </Select>
            <Select
              name="size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              <Option value="">Size</Option>
              <Option value="XS">XS</Option>
              <Option value="S">S</Option>
              <Option value="M">M</Option>
              <Option value="L">L</Option>
              <Option value="XL">XL</Option>
            </Select>
            <Select
              name="type"
              value={types}
              onChange={(e) => setTypes(e.target.value)}
            >
              <Option value="">Type</Option>
              <Option value="FLEECE">FLEECE</Option>
              <Option value="HOODIES"> HOODIES</Option>
              <Option value="JACKETS">JACKETS</Option>
              <Option value="MERINO">MERINO</Option>
              <Option value="PERFORM">PERFORM</Option>
              <Option value="SWEATS">SWEATS</Option>
              <Option value="TEES">TEES</Option>
            </Select>
          </Filter>
          <Filter>
            <Text>Sort Products:</Text>
            <Select name="sort" onChange={(e) => setSort(e.target.value)}>
              <Option value="newest">Newest</Option>
              <Option value="asc">Price (asc)</Option>
              <Option value="desc">Price (desc)</Option>
            </Select>
          </Filter>
        </FilterContainer>
        <Content>
          {loading ? (
            <Loading>
              <CircularProgress />
            </Loading>
          ) : error ? (
            <p>Error loading products: {error.message}</p>
          ) : Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <ProductItem key={item.id} item={item} />
            ))
          ) : (
            <Text>No Products found</Text>
          )}
        </Content>

        <Pagination>
          <Arrow
            direction="left"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            <ArrowBackIosNewOutlinedIcon />
          </Arrow>
          <Page>
            <span>{page}</span>
          </Page>
          <Arrow
            direction="right"
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page >= totalPages}
          >
            <ArrowForwardIosOutlinedIcon />
          </Arrow>
        </Pagination>

        <Newsletter />
        <Footer />
      </Container>
    );
}

export default ProductList