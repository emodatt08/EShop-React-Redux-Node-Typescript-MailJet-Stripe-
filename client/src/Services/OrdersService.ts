import http from "../http-common";
import IOrders from "../Types/Orders";
const getAllOrders = (page:number, limit:number) => {
  return http.get<Array<IOrders>>("/orders?page="+page+"&limit="+limit);
};
const declineOrder = (id: any, declineMessage:any) => {
  return http.post<IOrders>(`/decline/order/${id}`, declineMessage);
};
const acceptOrder = (id: any) => {
  return http.post<IOrders>(`/fulfil/order/${id}`, {});
};


const OrdersService = {
  getAllOrders,
  declineOrder,
  acceptOrder
};
export default OrdersService;