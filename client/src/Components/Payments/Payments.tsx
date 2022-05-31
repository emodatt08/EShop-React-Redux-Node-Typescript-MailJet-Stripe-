import React from 'react'
import Pagination from 'react-js-pagination';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getPayments } from '../../Actions/PaymentActions';
import { PaymentState } from '../../Reducers/PaymentReducer';
import { RootState } from '../../store';
import Payments from '../../Types/Payments';


export default function PaymentsPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [paginationItems, setPaginationItems] = React.useState<Payments>();
  const [error, setError] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { payments, paymentList } = useSelector<RootState, PaymentState>((state) => state.payment);

  const getPaymentList = (page: number, limit: number, params:any) => {
    setIsLoading(true);
    setError(false);
    dispatch<any>(getPayments(page, limit, params));
    setIsLoading(false);
  }

  const convertDate = (date: string | Date | undefined) => {
    const newDate = new Date(date ?? "");
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const setStatus = (status: number | string |boolean | undefined) => {
    if (status === "0"){
      return "Pending";
    } else if (status === "1"){
      return "Accepted";
    } else if (status === "2"){ 
      return "Declined";
    }
  }

  React.useEffect(() => {
    getPaymentList(1, 2, "");
  }, []);


  React.useEffect(() => {
    if (paymentList) {
      setPaginationItems(paymentList!);
    }
  }, [paymentList]);

  const seeDetails = (payment: Payments) => {
    localStorage.setItem("payment", JSON.stringify(payment));
    navigate(`/payment/details/${payment._id}`);
  }
  const handlePageChange = (pageNumber: number) => {
    console.log(`active page is ${pageNumber}`);
    getPaymentList(pageNumber, 2, "");
    setPaginationItems(paymentList!);
  };

  return (
    <div>
      <table className='table table-striped'>
        <thead className='table-dark'>
          <tr>
            <th>User</th>
            <th>OrderNo</th>
            <th>Card Type </th>
            <th>Expiry Month</th>
            <th>Expiry Year</th>
            <th>CVV</th>
            <th>Card Number</th>
            <th>Total Price</th>
            <th>Currency</th>
            <th>Source</th>
            <th>Description</th>
            <th>Created</th>
            <th>Updated</th>
            <th>Status</th>

            <th>
               Action
            </th>
          </tr>
        </thead>
        <tbody>
          {paymentList && paymentList?.results?.map((payment: Payments) => (
            <tr key={payment._id}>
              <td>{payment.user?.name}</td>
              <td>{payment.orderNo}</td>
              <td>{payment.card_type}</td>
              <td>{payment.exp_month}</td>
              <td>{payment.exp_year}</td>
              <td>{payment.cvv}</td>
              <td>{payment.card_number}</td>
              <td>{payment.total_price}</td>
              <td>{payment.currency}</td>
              <td>{payment.source}</td>
              <td>{payment.description}</td>
              <td>{convertDate(payment.createdAt)}</td>
              <td>{convertDate(payment.updatedAt)}</td>
              <td>{setStatus(payment.status)}</td>
              <td>
                <button  onClick={() => seeDetails(payment)} className='btn btn-warning'>See Details</button>&nbsp;
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
