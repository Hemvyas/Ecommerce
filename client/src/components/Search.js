import React from 'react'
import styled from "styled-components";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useDispatch } from "react-redux";
import {setSearchQuery} from "../redux/searchSlice"
const SearchBar = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  @media (max-width: 630px) {
    display: none;
  }
`;
const Input=styled.input`
border:none;
width:100%;
outline:none;
font-size:18px;
background:transparent;
color:black;
width:100%;
&::placeholder{
  color:darkgrey;
}
`
const Search = () => {
    const dispatch = useDispatch();

  return (
    <SearchBar style={{ color: "gray", fontSize: 16 }}>
      <Input placeholder="Search" onChange={(e)=>dispatch(setSearchQuery(e.target.value))}/>
      <SearchOutlinedIcon />
    </SearchBar>
  );
}

export default Search