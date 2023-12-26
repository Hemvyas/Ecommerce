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

const Container=styled.div`
`
const Title=styled.h1`
margin:20px;
`
const FilterContainer=styled.div`
display:flex;
justify-content:space-between;
`
const Filter=styled.div`
margin:20px;
`
const Text=styled.div`
font-size:17px;
font-weight:600;
margin-right:20px;
`
const Select=styled.select`
padding:10px;
margin-right:20px;
`
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
left:${props=>props.direction ==="left" && "10px"};
right:${props=>props.direction ==="right" && "10px"};
opacity:0.5;
z-index:1;
`
const Pagination=styled.div`
position:relative;
`
const ProductList = () => {
    const location=useLocation();
    const category = location.pathname.split('/')[2];

    // const [filter,setFilter]=useState({})
    // const [sort,setSort]=useState("newest")

    // const handleFilters=(e)=>{
    //     const value=e.target.value;
    //     setFilter({
    //         ...filter,
    //         [e.target.name]:value.toLowerCase(),
    //     })
    // }

    const [products,setProducts] = useState([])
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const getProducts=async()=>{
            const res=await axios.get(`http://localhost:5000/api/category/cat/${category}?page=${page}&limit=${limit}`);
            console.log(res.data);
            setProducts(res.data.products)
            setTotalPages(res.data.totalPages)
            console.log(res.data.totalPages);
        }
        getProducts();
    }, [category,page,limit])
    
    const handlePagination = (newPage) => {
      if (newPage > 0 && newPage <= totalPages) {
        setPage(newPage);
      }  
      };
      const isNextDisabled = page >= totalPages;


    return (


    // <Container>
    //     <Navbar/>
    //     <Announcement/>
    //     <Title>{category}</Title>
    //     <FilterContainer>
    //         <Filter><Text>Filter Products:</Text>
    //         <Select name='color' onChange={handleFilters}>
    //             <Option disabled selected>Color</Option>
    //             <Option>White</Option>
    //             <Option>Black</Option>
    //             <Option>Blue</Option>
    //             <Option>Yellow</Option>
    //             <Option>Green</Option>
    //         </Select>
    //         <Select name='size' onChange={handleFilters}>
    //             <Option disabled selected >Size</Option>
    //             <Option>XS</Option>
    //             <Option>S</Option>
    //             <Option>M</Option>
    //             <Option>L</Option>
    //             <Option>XL</Option>
    //         </Select>
    //         </Filter>
    //         <Filter><Text>Sort Products:</Text>
    //         <Select onChange={(e)=>setSort(e.target.value)}>
    //             <Option selected value="newest" >Newest</Option>
    //             <Option value="asc">Price (asc)</Option>
    //             <Option value="desc">Price (desc)</Option>
    //         </Select>
    //         </Filter>
    //     </FilterContainer>
    //     <Products category={category} filters={filter} sort={sort}/>
    //     <Newsletter/>
    //     <Footer/>
    // </Container>


    <Container>
     <Navbar/>
        <Announcement/>
        <Title>{category}</Title>
        <FilterContainer>
             <Filter><Text>Filter Products:</Text>
             <Select>
                 <Option disabled selected>Color</Option>
                 <Option>White</Option>
                 <Option>Black</Option>
                 <Option>Maroon</Option>
                 <Option>Yellow</Option>
                 <Option>Navy</Option>
                 <Option>Red</Option>
                 <Option>Orange</Option>
                 <Option>Gold</Option>
                 <Option>Aqua</Option>
                 <Option>Gray</Option>
             </Select>
             <Select>
                 <Option disabled selected >Size</Option>
                 <Option>XS</Option>
                 <Option>S</Option>
                 <Option>M</Option>
                 <Option>L</Option>
                 <Option>XL</Option>
             </Select>
             <Select>
                 <Option disabled selected >Type</Option>
                 <Option>FLEECE</Option>
                 <Option> HOODIES</Option>
                 <Option>JACKETS</Option>
                 <Option>MERINO</Option>
                 <Option>PERFORM</Option>
                 <Option>SWEATS</Option>
                 <Option>TEES</Option>
             </Select>
             </Filter>
             <Filter><Text>Sort Products:</Text>
             <Select>
                 <Option selected value="newest" >Newest</Option>
                 <Option value="asc">Price (asc)</Option>
                 <Option value="desc">Price (desc)</Option>
             </Select>
             </Filter>
         </FilterContainer>
         <Content>
         {Array.isArray(products) && products.length > 0 ? (
  products.map((item) => (
    <ProductItem key={item.id} item={item} />
  ))
) : (
  <p>No products found.</p>
)}
         </Content>

         <Pagination>
        <Arrow
          direction="left"
          onClick={() => handlePagination(page - 1)}
          disabled={page === 1}
        >
          <ArrowBackIosNewOutlinedIcon />
        </Arrow>
        <span>{page}</span>
        <Arrow
          direction="right"
          onClick={() => handlePagination(page + 1)}
          disabled={isNextDisabled}
        >
          <ArrowForwardIosOutlinedIcon />
        </Arrow>
      </Pagination>
         
         <Newsletter/>
         <Footer/>
    </Container>


  )
}

export default ProductList