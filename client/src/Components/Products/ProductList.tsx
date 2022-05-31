import React from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { deleteProduct, getProducts } from '../../Actions/ProductActions';
import { configs } from '../../app-configs';
import { ProductState } from '../../Reducers/ProductReducer';
import { RootState } from '../../store';
import IProducts from '../../Types/Iproducts';
import Pagination from 'react-js-pagination';

export default function () {
  
  const [isLoading, setIsLoading] = React.useState(false);
  const [paginationItems, setPaginationItems] = React.useState<IProducts>({});
  const [error, setError] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {productData, deleteSingleProduct} = useSelector<RootState, ProductState>((state) => state.products);


  const getProductList = (page, limit) => {
    setIsLoading(true);
    setError(false);
    dispatch<any>(getProducts(page, limit));
    setIsLoading(false);
  
  }

  const deleteProductData = (id: any) => {

    dispatch<any>(deleteProduct(id));
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      getProductList(1, 3);
    }, 1000);
   
  }

  React.useEffect(() => {
    getProductList(1, 3);
  }, []);

  React.useEffect(() => {
    if (productData) {
      setPaginationItems(productData);
    }
  }, [productData]);

  const handlePageChange = (pageNumber: number) => {
    console.log(`active page is ${pageNumber}`);
    getProductList(pageNumber, 3);
    setPaginationItems(productData!);
  };
  return (
    <div>
        {isLoading ? (  <span className="">{deleteSingleProduct &&  deleteSingleProduct.hasOwnProperty("productId") ? "Successfully Deleted" : "Not Successful"}</span>):("")}
      <table className='table table-striped'>
        <thead className='table-dark'>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>
            <Link to={"/add/products"}><button className='btn btn-primary'>Add</button></Link>&nbsp;
            </th>
          </tr>
        </thead>
        <tbody>
          {productData?.results && productData?.results.map((product: IProducts) => (
            <tr key={product.productId}>
              <td><img style={{height:"50px", width:"50px"}} src={configs.imageUrl+product.productId} alt={product.image} /></td>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td>
              <Link to={`/edit/product/${product.productId}`}><button className='btn btn-primary'>Edit</button></Link>&nbsp;
              <button className='btn btn-danger' onClick={() => deleteProductData(product.productId)}>Delete</button>
              </td>
            </tr>
          ))}

        </tbody>
      </table>
      <div className='mt-3'>
          <Pagination
          totalItemsCount={paginationItems?.total ?? 5}
          activePage={paginationItems?.current_page ?? 1}
          itemsCountPerPage={paginationItems?.per_page ?? 5}
          onChange={(pageNumber) => handlePageChange(pageNumber)}
          itemClass="page-item"
          linkClass='page-link'
          firstPageText="first"
          lastPageText="last"
          />         
      </div>
    </div>
  )
}
