import { Add, Remove } from '@mui/icons-material';
import React from 'react'
import styled from 'styled-components';
import Announcements from '../partials/Announcements';
import Footer from '../partials/Footer';
import Header from '../partials/Header';
import Newsletter from '../partials/Newsletter';
import { mobile } from '../partials/Responsive';

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection:"column" })}
`;
const ImgContainer = styled.div`
  flex: 1;
`;
const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh", marginTop:"20px" })}
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;
const ProductTitle = styled.h1`
  font-weight: 200;
`;
const ProductDesc = styled.p`
   margin: 20px 0px;
`;
const ProductPrice = styled.span`
   font-weight: 100;
   font-size: 40px;
`;
const FilterContainer = styled.div`
  width:50%;
  margin: 30px 0px;
  display:flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
`;
const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;
const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;
const FilterSize= styled.select`
  margin-left: 10px;
  padding: 5px; 
`;
const FilterSizeOption = styled.option``;
const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;
const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid #5741d9;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid #5741d9;
  background-color: white;
  cursor: pointer;
  font-weight: 500;


  &:hover{
    background-color: #5741d9;
    color: white;
  }
`;



export default function Product() {
  return (
    <Container>
        <Announcements />
        <Header />
        <Wrapper>
          <ImgContainer>
              <Image src="https://img.ltwebstatic.com/images3_pi/2022/08/10/166010027785fc577d3354bd24f4c8216dcd989611_thumbnail_900x.webp"/>
          </ImgContainer>
          <InfoContainer>
            <ProductTitle>Contrast Mesh Sleeve</ProductTitle>
            <ProductDesc>Contrast Mesh Bishop Sleeve Shawl Collar Blazer, can be worn in the summer as well as winter</ProductDesc>
            <ProductPrice>GHs 20</ProductPrice>
            <FilterContainer>
              <Filter>

                <FilterTitle>Color</FilterTitle>
                <FilterColor color="black"/>
                <FilterColor color="darkblue"/>
                <FilterColor color="gray"/>

              </Filter>
              <Filter>
                  <FilterTitle>Size</FilterTitle>
                  <FilterSize>
                    <FilterSizeOption>XS</FilterSizeOption>
                    <FilterSizeOption>S</FilterSizeOption>
                    <FilterSizeOption>M</FilterSizeOption>
                    <FilterSizeOption>L</FilterSizeOption>
                    <FilterSizeOption>XL</FilterSizeOption>
                    <FilterSizeOption>2XL</FilterSizeOption>
                  </FilterSize>
              </Filter>
            </FilterContainer>
            <AddContainer>
                <AmountContainer>
                  <Remove />
                    <Amount>1</Amount>
                  <Add />
                </AmountContainer>
                <Button>Add to Cart</Button>
            </AddContainer>
          </InfoContainer>
        </Wrapper>
      
        <Newsletter />
        <Footer />
    </Container>
  )
}
