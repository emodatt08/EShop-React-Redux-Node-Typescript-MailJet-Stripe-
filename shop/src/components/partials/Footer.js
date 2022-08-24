import { Facebook, Instagram, LinkedIn, MailOutline, Phone, Room, Twitter } from '@mui/icons-material';
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
`;

const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`;

const Logo = styled.h1`

`;

const Desc = styled.p`
   margin: 20px 0px;
   
`;
const SocialContainer = styled.div`
    display: flex;
`;
const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${props=>props.color};
    display:flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
`;

const Center = styled.div`
    flex: 1;
    padding: 20px;
`;



const Title = styled.h3`
    margin-bottom: 30px;

`
const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`

const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
`
const Right = styled.div`
    flex: 1;
    padding: 20px;
`;

const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    margin-left: 43%;
    align-items: center;  
`;

const Payment = styled.img`
    width: 50%;
    margin-left: 38%;
`;


export default function Footer() {
  return (
    <Container>
        <Left>
            <Logo>SHOP</Logo>
            <Desc>
                SHOP is a global fashion and lifestyle e-tailer committed to making the beauty of fashion accessible to everyone.
                Our values consist of putting customers first, going all out, acting and adapting, continuous learning.
            </Desc>
            <SocialContainer>
                <SocialIcon color="3B5999"><Facebook /></SocialIcon>
                <SocialIcon color="E4405f"><Instagram /></SocialIcon>
                <SocialIcon color="55ACEE"><Twitter /></SocialIcon>
                <SocialIcon color="0a66c2"><LinkedIn /></SocialIcon>
            </SocialContainer>
        </Left>
        <Center>
            <Title>Useful Links</Title>
            <List>
                <ListItem>Home</ListItem>
                <ListItem>Cart</ListItem>
                <ListItem>Men's fashion</ListItem>
                <ListItem>Women's fashion</ListItem>
                <ListItem>My Account</ListItem>
                <ListItem>Order Tracking</ListItem>
                <ListItem>WishList</ListItem>
                <ListItem>Terms and Conditions</ListItem>
            </List>
        </Center>
        <Right>
            <Title>Contact</Title>
            <ContactItem><Room style={{marginRight: "10px"}}/>Plot 560, Madina Old Road</ContactItem>
            <ContactItem><Phone style={{marginRight: "10px"}}/>+233 247182993</ContactItem>
            <ContactItem><MailOutline style={{marginRight: "10px"}}/>contact@shop.com</ContactItem>
            <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
        </Right>
    </Container>
  )
}
