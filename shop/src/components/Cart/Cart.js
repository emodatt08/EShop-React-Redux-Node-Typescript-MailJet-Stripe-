import { Add, Remove } from '@mui/icons-material';
import React from 'react'
import styled from 'styled-components';
import Announcements from '../partials/Announcements';
import Footer from '../partials/Footer';
import Header from '../partials/Header';


const Container = styled.div``;
const Wrapper = styled.div`
  padding: 20px;
`;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${props => props.type === "filled" && "none"};
  background-color: ${props => props.type === "filled"  ? "#5741d9" : "transparent"};
  color: ${props => props.type === "filled" ? "white" :  "black"};
`;

const TopTexts = styled.div`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 20px;
`;

const TopText = styled.span`
  margin: 0px 10px;
`

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  flex: 3;
`;
const Summary = styled.div`
  flex: 1;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const ProductId = styled.div`
  
`;

const Image = styled.img`
  width: 200px;
`;

const ProductSize = styled.span`
  
`;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductName= styled.span`
  
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;


const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

export default function Cart() {
  return (
    <Container>
        <Announcements />
        <Header />

      <Wrapper>
        <Title>Your Bag</Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Your Wishlist(0)</TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            <Product>
              <ProductDetail>
                <Image src="https://img.ltwebstatic.com/images3_pi/2022/07/12/16576073202dcda3190d454cc85292d1a86fe4721d_thumbnail_900x.webp"/>
                <Details>
                  <ProductName><b>Product: </b>Girls Half Zip Sweatshirt</ProductName>
                  <ProductId><b>SKU: </b> 8445758203</ProductId>
                  <ProductColor color = "black" />
                  <ProductSize><b>Size:</b> 27.8</ProductSize>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  <Add />
                  <ProductAmount>2</ProductAmount>
                  <Remove />
                 
                </ProductAmountContainer>
                <ProductPrice>GHs 25</ProductPrice>
              </PriceDetail>
            </Product>
            <Hr />
            <Product>
              <ProductDetail>
                <Image src="https://img.ltwebstatic.com/images3_pi/2022/04/24/16507945253088a7751800d16be1f3c1140dbd4a83_thumbnail_900x.webp"/>
                <Details>
                  <ProductName><b>Product: </b>Breathable Softness Wide Waistband</ProductName>
                  <ProductId><b>SKU: </b>st2203285217116682</ProductId>
                  <ProductColor color = "black" />
                  <ProductSize><b>Size:</b> 13.2</ProductSize>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  <Add />
                  <ProductAmount>5</ProductAmount>
                  <Remove />
                </ProductAmountContainer>
                <ProductPrice>GHs 25</ProductPrice>
              </PriceDetail>
            </Product>
          </Info>
          <Summary>
            <SummaryTitle>Order Summary</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>GHs 345</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Delivery</SummaryItemText>
              <SummaryItemPrice>GHs 24</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Delivery Discount</SummaryItemText>
              <SummaryItemPrice>GHs -40.9</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText type="total">Total</SummaryItemText>
              <SummaryItemPrice>GHs 345</SummaryItemPrice>
            </SummaryItem>
            <Button>CHECKOUT</Button>
          </Summary>
        </Bottom>
      </Wrapper>

        <Footer />
    </Container>
  )
}
