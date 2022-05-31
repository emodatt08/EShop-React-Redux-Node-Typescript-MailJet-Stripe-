import React from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { acceptOrder, getOrders } from '../../Actions/OrderActions';

import { configs } from '../../app-configs';
import { OrderState } from '../../Reducers/OrderReducer';

import { RootState } from '../../store';
import IOrders from '../../Types/Orders';
import Pagination from 'react-js-pagination';

export default function () {
  
  const [isLoading, setIsLoading] = React.useState(false);
  const [paginationItems, setPaginationItems] = React.useState<IOrders>();
  const [error, setError] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {orders,orderList, acceptOrderState} = useSelector<RootState, OrderState>((state) => state.orders);


  const getAllOrders = (page: number, limit: number) => {
    setIsLoading(true);
    setError(false);
    dispatch<any>(getOrders(1, 3));
    setIsLoading(false);
  
    console.log(orders);
  }

  const acceptAnOrder = (id: any) => {

    dispatch<any>(acceptOrder(id));
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      getAllOrders(1, 3);
    }, 1000);
   
  }

  const convertDate = (date: string | undefined) => {
    const newDate = new Date(date ?? "");
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const setStatus = (status: number | boolean | undefined) => {
    if (status === 0){
      return "Pending";
    } else if (status === 1){
      return "Accepted";
    } else if (status === 2){ 
      return "Declined";
    }
  }

  const seeProducts = (order: IOrders) => {
    localStorage.setItem("products", JSON.stringify(order.productIds));
    navigate(`/order/products/${order.orderNo}`);
  }

  React.useEffect(() => {
    getAllOrders(1, 3);
  }, []);


  React.useEffect(() => {
    if (orderList) {
      setPaginationItems(orderList!);
    }
  }, [orderList]);

  const handlePageChange = (pageNumber: number) => {
    console.log(`active page is ${pageNumber}`);
    getAllOrders(pageNumber, 3);
    setPaginationItems(orderList!);
  };


  return (
    <div>
        {isLoading ? (  <span className="">{acceptOrderState &&  acceptOrderState.hasOwnProperty("responseCode") && acceptOrderState?.responseCode === 200 ? "Successfully Accepted, Email Sent!" : "Not Successful"}</span>):("")}
      <table className='table table-striped'>
        <thead className='table-dark'>
          <tr>
            <th>OrderNo</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Customer </th>
            <th>Delivery Location</th>
            <th>Delivery Date</th>
            <th>Delivered</th>
            <th>Fulfiled</th>
            <th>Status</th>
            <th>Action</th>
            <th>
         
            </th>
          </tr>
        </thead>
        <tbody>
          {orderList && orderList?.results?.map((order: IOrders) => (
            <tr key={order.orderNo}>
              <td>{order.orderNo}</td>
              <td>{order.quantity}</td>
              <td>{order.total_price}</td>
              <td>{order.user.name}</td>
              <td>{order.delivery_location}</td>
              <td>{convertDate(order.delivery_date)}</td>
              <td>{order.delivered ? "yes":"no"}</td>
              <td>{order.fulfiled ? "yes":"no"}</td>
              <td>{setStatus(order.order_status)}</td>
              <td>
                <button  onClick={() => acceptAnOrder(order.orderNo)} className='btn btn-primary'>Accept</button>&nbsp;
                <Link  to={`/decline/order/${order.orderNo}`} className='btn btn-danger' >Decline</Link>&nbsp;
                <button  onClick={() => seeProducts(order)} className='btn btn-warning'>See Products</button>&nbsp;
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
