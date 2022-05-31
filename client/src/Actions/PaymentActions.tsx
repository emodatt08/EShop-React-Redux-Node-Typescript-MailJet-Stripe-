import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { GET_PAYMENT_FAILURE, GET_PAYMENT_REQUEST, GET_PAYMENT_SUCCESS } from "../Constants/PaymentConstants";
import PaymentsService from "../Services/PaymentsService";
import { RootState } from "../store";

export const getPayments = (page:number, limit:number, params:any): ThunkAction<Promise<void>,RootState,unknown,AnyAction> => 
async (dispatch: ThunkDispatch<RootState,unknown,AnyAction>): Promise<void> => {
try {
    dispatch({ 

        type: GET_PAYMENT_REQUEST 
    
    })
    const response = await PaymentsService.getAllPayments(page, limit,params).then((response) => {
        if (response.status === 200 && response.data) {
            dispatch({
                type: GET_PAYMENT_SUCCESS,
                payload: response.data
            })
        } else {
            dispatch({
                type: GET_PAYMENT_FAILURE,
                payload: response.data
            })

        }
      });
   
} catch (error) {
    //if get payments fail, dispatch failure action
    dispatch({
        type: GET_PAYMENT_FAILURE,
        payload: error
    })

}

}