
interface User{
    responseCode?: number;
    _id?: string,
    name?: string,
    username?: string,
    email?: string,
    password?: string,
    role?: string,
    createdAt: Date | string | undefined,
    updatedAt: Date | string | undefined,
}

interface Results extends User{
    user: User,
    orderNo: string,
    card_type: string,
    exp_month: string,
    exp_year: number,
    cvv: string,
    card_number: string,
    total_price: number,
    currency: string,
    source: string,
    description: string,
    status: string,
    payment_response: string,
    raw_payment_response: string,
    isDeleted: boolean
}

export default interface Payments extends Results{
    results?: Results[] ,
    total?: number,
    per_page?: number,
    current_page?: number,
    next?: {},
    previous?: {}

}