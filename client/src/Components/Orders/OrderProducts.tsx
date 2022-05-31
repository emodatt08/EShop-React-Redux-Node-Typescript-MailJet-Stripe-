import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { configs } from '../../app-configs';
import IProducts from '../../Types/Iproducts';

export default function OrderProducts() {
    const [products, setProducts] = React.useState([]);
    const {orderNo} = useParams();
    useEffect(() => {
        setProducts(localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')! ) : undefined);
    }, []);
  return (
    <div>
        <p><strong>Products For #{orderNo}</strong></p>
        <table className='table table-striped'>
        <thead className='table-dark'>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {products && products.map((product: IProducts) => (
            <tr key={product.productId}>
              <td><img style={{height:"50px", width:"50px"}} src={configs.imageUrl+product.productId} alt={product.image} /></td>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
           
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
