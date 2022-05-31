import { GET_ORDER_FAILURE, GET_ORDER_REQUEST, GET_ORDER_SUCCESS } from "../Constants/OrderConstants";
import IOrders from "../Types/Orders";

export interface OrderState {
    isLoggedIn?: boolean;
    isLoading?: boolean;
    error?: boolean;
    orders: [];
    orderList?:IOrders,
    declineOrderState?: {responseCode?: number};
    acceptOrderState?: {responseCode?: number};
}

interface Action {
    type: string;
    payload?: any;
}

export const  OrderReducer = ( state: OrderState = {orders:[]}, action: Action) => {
    switch (action.type) {
        case GET_ORDER_REQUEST:
            return {
                isLoading: true
            }
        case GET_ORDER_SUCCESS:
            return {
                isLoading: false,
                isLoggedIn: true,
                orderList: action.payload
            }
        case GET_ORDER_FAILURE:
            return {
                isLoading: false,
                isLoggedIn: false,
                error: action.payload
            }


        case 'DECLINE_ORDER_REQUEST':
            return {
                ...state,
                declineOrderState: action.payload
            }
        case 'DECLINE_ORDER_SUCCESS':
            return {
                ...state,
                declineOrderState: action.payload
            }
        case 'DECLINE_ORDER_FAILURE':
            return {
                ...state,
                declineOrderState: action.payload
            }

        case 'ACCEPT_ORDER_REQUEST':
            return {
                ...state,
                acceptOrderState: action.payload
            }
        case 'ACCEPT_ORDER_SUCCESS':
            return {
                ...state,
                acceptOrderState: action.payload
            }
        case 'ACCEPT_ORDER_FAILURE':
            return {
                ...state,
                acceptOrderState: action.payload
            }
        default:
            return state
    }
}