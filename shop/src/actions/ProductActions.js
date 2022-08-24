import { GET_PRODUCTS_REQUEST, GET_SELECTED_PRODUCT, SET_PRODUCTS } from "../constants/ProductConstants"
import ProductService from "../services/ProductService";


export const setProducts = (products) => {
    return {
        type: SET_PRODUCTS,
        payload: products
    };
};

export const selectedProducts = (product) => {
    return {
        type: GET_SELECTED_PRODUCT,
        payload: product
    }
}

export const getProducts = () => {
      try{
        console.log("getProducts");
        return async (dispatch) => {
            dispatch({
                type: GET_PRODUCTS_REQUEST
          })
            const response = await ProductService.getProducts();
            dispatch(setProducts(response));
        }
      }catch(e){
          console.log(e);
      }
}

