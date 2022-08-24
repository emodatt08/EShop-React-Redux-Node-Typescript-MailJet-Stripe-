import React, { useState } from 'react'
import styled from 'styled-components'
import {ArrowLeftOutlined, ArrowRightOutlined} from '@mui/icons-material';
import { sliderItems } from '../../data/data';

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;

    position: relative;
    margin-top:25px;
`

const Arrow = styled.div`
    width:50px;
    height: 50px;
    background-color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left:  ${props => props.direction === "left" && "10px" };
    right: ${props => props.direction === "right" && "10px"};
    top: 0;
    bottom: 0;
    margin: auto;
    opacity: 0.5;
    z-index: 2;
    cursor: pointer;
`
const Wrapper = styled.div`
    height: 100%;
    display:flex;
    transition: all 1.5s ease;
    transform: translateX(${props => props.slideIndex * -100}vw);
`
const Slide = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    background-color: #${props => props.bg}
`

const ImgContainer = styled.div`
    height: 100%;
    flex: 1;
`
const InfoContainer = styled.div`
    flex: 1;
    padding:50px;
`

const Image = styled.img`
    height: 80%;
`
const Title = styled.h1`
    font-size: 70px;
`
const Description = styled.p`
    margin: 50px 0px;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 3px;
`
const Button = styled.button`
    padding: 10px;
    font-size: 20px;
    background-color: transparent;
    cursor: pointer;
`

export default function Slider() {
    const[slideIndex, setSlideIndex] = useState(0);

    const handleClick =(direction)=>{
        if(direction === "left"){
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
        }else{
            setSlideIndex(slideIndex < 2 ? slideIndex + 1: 0);
        }
    }
  return (
    <Container>
        <Arrow direction="left" onClick={() => handleClick("left")}>
            <ArrowLeftOutlined />
        </Arrow>    

            <Wrapper slideIndex = {slideIndex}>
                {sliderItems && sliderItems.map((item) => (
                    <Slide key={item.id} bg={item.bg}>
                        <ImgContainer>
                            <Image src={item.img}/>
                        </ImgContainer>
                        <InfoContainer>
                            <Title>{item.title}</Title>
                            <Description>{item.description}</Description>
                            <Button>{item.clickButtonText}</Button>
                        </InfoContainer>
                    </Slide>
                ))}
            </Wrapper>

        <Arrow direction="right"  onClick={() => handleClick("right")}>
            <ArrowRightOutlined />
        </Arrow> 


    </Container>
  )
}
