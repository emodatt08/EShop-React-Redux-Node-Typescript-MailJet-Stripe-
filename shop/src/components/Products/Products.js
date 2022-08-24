import React from 'react'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getProducts } from '../../actions/ProductActions';
import styled from 'styled-components'
import {productData} from '../../data/productData';
import ProductDetails from './ProductDetails';

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

export default function Products() {
    const {products} = useSelector((state) => state.products);
    const dispatch = useDispatch();
   
    useEffect(() => {
      //getProductData();
    }, []);

    const getProductData = () => {
      dispatch(getProducts());
    }
    
  return (
    <div>
      <Container>
          {productData && productData.map((item) =>(
            <ProductDetails item={item} key={item.id} />
          ))}
      </Container>
    </div>
  )
}
