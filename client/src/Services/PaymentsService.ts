import http from "../http-common";
import Payments from "../Types/Payments";

const getAllPayments = (page:number, limit:number, params:any) => {
  return http.get<Array<Payments>>("/all/payments?page="+page+"&limit="+limit+"&"+params);
};
const PaymentsService = {
    getAllPayments
}
export default PaymentsService;