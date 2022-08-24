import React from 'react';
import styled from 'styled-components'
import Search from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge } from '@mui/material';

const  Container = styled.div`
    height: 60px;
`;

const Wrapper = styled.div`
    padding:10px 20px;
    display:flex;
    align-items: center;
    justify-content:space-between;
`;

const Language = styled.span`
    font-size: 14px;
    cursor: pointer;
`;

const SearchContainer = styled.div`
    border: 1px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
`;

const Input = styled.input`
    border: none;
`;

const Center = styled.div`
    flex:1;
    text-align: center;
`;

const Logo = styled.h1`
    font-weight: bold;
`;

const Right = styled.div`
    flex:1;
    display:flex;
    align-items: center;
    justify-content: flex-end;
`;

const Left = styled.div`
   flex:1;
   display:flex;
   align-items: center;
`;

const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin:25px;
`;

const Header = () => {
    return (
             <Container>
                <Wrapper>
                    <Left>
                        <Language>En</Language>
                        <SearchContainer>
                            <Input />
                            <Search style={{color: "gray", fontSize:17}}/>
                        </SearchContainer>
                    </Left>
                    <Center><Logo>Shop</Logo></Center>
                    <Right>
                        <MenuItem>Register</MenuItem>
                        <MenuItem>Sign In</MenuItem>
                        <MenuItem>
                            <Badge badgeContent={4} color="primary">
                               <ShoppingCartIcon />
                            </Badge>
                        </MenuItem>
                    </Right>
                </Wrapper>
            </Container>
    
    )
}

export default Header;