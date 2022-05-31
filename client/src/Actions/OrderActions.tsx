import { ThunkAction,ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { RootState } from '../store'
import IOrders from '../Types/Orders'
import { GET_ORDER_FAILURE, GET_ORDER_REQUEST, GET_ORDER_SUCCESS } from '../Constants/OrderConstants'
import OrdersService from '../Services/OrdersService'

/**
 * Get Orders
 * @returns {Promise<void>}
 */
 export const getOrders = (page:number, limit:number): ThunkAction<Promise<void>,RootState,unknown,AnyAction> => 
 async (dispatch: ThunkDispatch<RootState,unknown,AnyAction>): Promise<void> => {
 try {
     dispatch({ 

         type: GET_ORDER_REQUEST 
     
     })
     const response = await OrdersService.getAllOrders(page, limit).then((response) => {
         if (response.status === 200 && response.data) {
             dispatch({
                 type: GET_ORDER_SUCCESS,
                 payload: response.data
             })
         } else {
             dispatch({
                 type: GET_ORDER_FAILURE,
                 payload: response.data
             })

         }
       });
    
 } catch (error) {
     //if login fail, dispatch failure action
     dispatch({
         type: GET_ORDER_FAILURE,
         payload: error
     })

 }

}

export const declineOrderService = (orderId: any, declineMessage:any): ThunkAction<Promise<void>,RootState,unknown,AnyAction> =>
async (dispatch: ThunkDispatch<RootState,unknown,AnyAction>): Promise<void> => {
    try {
        dispatch({
            type: 'DECLINE_ORDER_REQUEST'
        })
        console.log("inside service:", orderId, declineMessage);
        const response = await OrdersService.declineOrder(orderId, declineMessage).then((response) => {
            if (response.status === 200 && response.data) {
                dispatch({
                    type: 'DECLINE_ORDER_SUCCESS',
                    payload: response.data
                })
            } else {
                dispatch({
                    type: 'DECLINE_ORDER_FAILURE',
                    payload: response.data
                })

            }
          });
       
    } catch (error) {
        //if login fail, dispatch failure action
        dispatch({
            type: 'DECLINE_ORDER_FAILURE',
            payload: error
        })

    }
}

export const acceptOrder = (orderId: any): ThunkAction<Promise<void>,RootState,unknown,AnyAction> => 
async (dispatch: ThunkDispatch<RootState,unknown,AnyAction>): Promise<void> => {
    try {
        dispatch({
            type: 'ACCEPT_ORDER_REQUEST'
        })
        const response = await OrdersService.acceptOrder(orderId).then((response) => {
            if (response.status === 200 && response.data) {
                dispatch({
                    type: 'ACCEPT_ORDER_SUCCESS',
                    payload: response.data
                })
            } else {
                dispatch({
                    type: 'ACCEPT_ORDER_FAILURE',
                    payload: response.data
                })

            }
          });
       
    } catch (error) {
        //if login fail, dispatch failure action
        dispatch({
            type: 'ACCEPT_ORDER_FAILURE',
            payload: error
        })

    }
}