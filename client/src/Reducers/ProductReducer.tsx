
import { GET_PRODUCT_REQUEST, GET_PRODUCT_FAILURE,SAVE_PRODUCT_SUCCESS, SAVE_PRODUCT_FAILURE, GET_PRODUCT_SUCCESS, SAVE_PRODUCT_REQUEST, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAILURE, GET_SINGLE_PRODUCT_FAILURE, GET_SINGLE_PRODUCT_REQUEST, GET_SINGLE_PRODUCT_SUCCESS, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAILURE} from '../Constants/ProductConstants'
import IProducts from '../Types/Iproducts'

export interface ProductState{
    isLoggedIn?: boolean,
    isLoading?: boolean,
    error?: boolean,
    storedProduct?:{productId?:string,productName?:string,productDescription?:string,productPrice?:string|number,productImage?:string},
    editProduct?:IProducts,
    updateProduct?: IProducts,
    deleteSingleProduct?: IProducts,
    storedProductImage?:{},
    productData?: IProducts,
    products: [],
}

interface Action{
    type: string,
    payload?: string
}

export const ProductReducer = (state:ProductState = {products: []},  action: Action) => {
    switch (action.type) {
        case GET_PRODUCT_REQUEST:
            return {
                isLoading: true
            }
        case GET_PRODUCT_SUCCESS:
            return {
                isLoading: false,
                isLoggedIn: true,
                productData: action.payload
            }
        case GET_PRODUCT_FAILURE:
            return {
                isLoading: false,
                isLoggedIn: false,
                error: action.payload
            }

        //save product
        case SAVE_PRODUCT_REQUEST:
            return {
                isLoading: true
            }
        case SAVE_PRODUCT_SUCCESS:
            return {
                isLoggedIn: false,
                user: null,
                storedProduct: action.payload
            }
        case SAVE_PRODUCT_FAILURE:
            return {
                isLoading: false,
                isLoggedIn: false,
                error: action.payload
            }

        case GET_SINGLE_PRODUCT_REQUEST:
            return {
                isLoading: true
            }
        case GET_SINGLE_PRODUCT_SUCCESS:
            return {
                isLoading: false,
                isLoggedIn: true,
                editProduct: action.payload
            }
        case GET_SINGLE_PRODUCT_FAILURE:
            return {
                isLoading: false,
                isLoggedIn: false,
                error: action.payload
            }
         
        //update product
        case UPDATE_PRODUCT_REQUEST:
            return {
                isLoading: true
            }
        case UPDATE_PRODUCT_SUCCESS:
            return {
                isLoggedIn: false,
                user: null,
                updateProduct: action.payload
            }
        case UPDATE_PRODUCT_FAILURE:
            return {
                isLoading: false,
                isLoggedIn: false,
                error: action.payload
            }

        //delete product
        case DELETE_PRODUCT_REQUEST:
            return {
                isLoading: true
            }
        case DELETE_PRODUCT_SUCCESS:
            return {
                isLoggedIn: false,
                user: null,
                deleteSingleProduct: action.payload
            }
        case DELETE_PRODUCT_FAILURE:
            return {
                isLoading: false,
                isLoggedIn: false,
                error: action.payload
            }



        default:
            return state
    }
}
