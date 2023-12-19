import React from 'react'
import styled from 'styled-components'

const Container=styled.div`
    height:30px;
    background:teal;
    color:#fff;
    display:flex;
    justify-content:center;
    font-weight:500;
    font-size:14px;
`

const Announcement = () => {
  return (
    <Container>Announcement</Container>
  )
}

export default Announcement