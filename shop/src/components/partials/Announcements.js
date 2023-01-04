import React from 'react'
import styled from 'styled-components'
import { mobile } from './Responsive'

const Container = styled.div`
    height:30px;
    background-color: #5741d9;
    color:white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 500px;
    ${mobile({ paddingBottom: "10px"})}
`
export default function Announcements() {
  return (
    <div>
        <Container>
            Better, Bigger and Stronger Deals, Free Shipping and Tracking on order over GHS 100
        </Container>

    </div>
  )
} 
