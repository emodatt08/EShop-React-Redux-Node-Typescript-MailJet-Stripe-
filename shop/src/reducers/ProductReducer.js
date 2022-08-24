import { SET_PRODUCTS } from "../constants/ProductConstants";

const initState = {
    products: [],
}
export const productReducer = (state = initState, { type, payload}) => {
    switch (type) {
        case SET_PRODUCTS:
            return {
                ...state,
                products: payload
            }
        break;
    
        default:
            return state;
    }
}