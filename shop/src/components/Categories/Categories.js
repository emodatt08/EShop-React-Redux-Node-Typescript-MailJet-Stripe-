import React from 'react'
import styled from 'styled-components'
import CategoryItem from './CategoryItem'
import {categoryData} from '../../data/categoryData';
const Container = styled.div`
    display:flex;
    padding: 20px;
    justify-content: space-between;
`
export default function Categories() {
  return (
    <Container>
      {categoryData && categoryData.map((item) => (
          <CategoryItem item={item} key={item.id}/>
      ))}
       
    </Container>
  )
}
