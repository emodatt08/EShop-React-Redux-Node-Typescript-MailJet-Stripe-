interface user{
    name:string,
}
interface Results extends user {
    orderNo: string;
    quantity?: number,
    longitude?:string,
    latitude?:string,
    total_price?: number,
    delivery_location?: string,
    delivery_date?: string | undefined,
    delivered?: boolean,
    fulfiled?: number | boolean | undefined,
    order_status?: number | boolean | undefined,
    declineMessage?: string,
    productIds?: Array<string>,
    user:user
}
export default interface IOrders extends Results{
    results?: Results[] ,
    total?: number,
    per_page?: number,
    current_page?: number,
    next?: {},
    previous?: {}
}