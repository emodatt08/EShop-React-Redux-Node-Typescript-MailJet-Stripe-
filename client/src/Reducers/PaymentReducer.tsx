import { GET_ORDER_FAILURE, GET_ORDER_REQUEST, GET_ORDER_SUCCESS } from "../Constants/OrderConstants";
import { GET_PAYMENT_FAILURE, GET_PAYMENT_REQUEST, GET_PAYMENT_SUCCESS } from "../Constants/PaymentConstants";
import IOrders from "../Types/Orders";
import Payments from "../Types/Payments";

export interface PaymentState {
    isLoggedIn?: boolean;
    isLoading?: boolean;
    error?: boolean;
    payments: [];
    paymentList?:Payments
}

interface Action {
    type: string;
    payload?: any;
}

export const  PaymentReducer = ( state: PaymentState = {payments:[]}, action: Action) => {
    switch (action.type) {
        case GET_PAYMENT_REQUEST:
            return {
                isLoading: true
            }
        case GET_PAYMENT_SUCCESS:
            return {
                isLoading: false,
                isLoggedIn: true,
                paymentList: action.payload
            }
        case GET_PAYMENT_FAILURE:
            return {
                isLoading: false,
                isLoggedIn: false,
                error: action.payload
            }

        default:
            return state;

        }
}
