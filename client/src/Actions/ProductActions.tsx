import React from 'react'
import { ThunkAction,ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { GET_PRODUCT_REQUEST, GET_PRODUCT_FAILURE,SAVE_PRODUCT_SUCCESS, SAVE_PRODUCT_FAILURE, GET_PRODUCT_SUCCESS, SAVE_PRODUCT_REQUEST, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAILURE, GET_SINGLE_PRODUCT_SUCCESS, GET_SINGLE_PRODUCT_REQUEST, GET_SINGLE_PRODUCT_FAILURE, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAILURE, DELETE_PRODUCT_REQUEST} from '../Constants/ProductConstants'
import { RootState } from '../store'
import AuthService from '../Services/AuthService'
import ProductsService from '../Services/ProductsService'
import IProducts from '../Types/Iproducts'

/**
 * Get Products
 * @returns {Promise<void>}
 */
export const getProducts = (page:number, limit:number): ThunkAction<Promise<void>,RootState,unknown,AnyAction> => 
    async (dispatch: ThunkDispatch<RootState,unknown,AnyAction>): Promise<void> => {
    try {
        dispatch({ 

            type: GET_PRODUCT_REQUEST 
        
        })
        const response = await ProductsService.getAll(page,limit).then((response) => {
            if (response.status === 200 && response.data) {
                dispatch({
                    type: GET_PRODUCT_SUCCESS,
                    payload: response.data
                })
            } else {
                dispatch({
                    type: GET_PRODUCT_FAILURE,
                    payload: response.data
                })

            }
          });
       
    } catch (error) {
        //if login fail, dispatch failure action
        dispatch({
            type: GET_PRODUCT_FAILURE,
            payload: error
        })

    }
    

}

/**
 * Create Product
 * @param product 
 * @returns 
 */
export const createProduct = (product:IProducts, productImage:FormData): ThunkAction<Promise<void>,RootState,unknown,AnyAction> =>
    async (dispatch: ThunkDispatch<RootState,unknown,AnyAction>): Promise<void> => {
        try {
            dispatch({
                type: SAVE_PRODUCT_REQUEST
            })
            console.log("product ",product);
            const createProductService = await ProductsService.create(product).then((response) => {
                if (response.status === 200 && response.data) {
                    uploadProductImage(productImage, response.data.productId);
                    dispatch({
                        type: SAVE_PRODUCT_SUCCESS,
                        payload: response.data
                    })
                } else {
                    dispatch({
                        type: SAVE_PRODUCT_FAILURE,
                        payload: response.data
                    })
                }
            });
        } catch (error) {
            console.log("Error",error);
        }
        
}

/**
 * Uploads product Image
 * @param data 
 * @param id 
 * @returns 
 */
 const uploadProductImage = async (data:any, id:any) => {
        try {  
            console.log("uploadProductImageData",data);
            console.log("uploadProductImageID",id);
            const addProductImageService = await ProductsService.addProductImage(data, id).then((response) => {
                if (response.status === 200 && response.data) {
                    return response.data
                } 
            });
        } catch (error) {
            console.log("Error",error);
        }
    }

/**
 * Get a Product
 * @param id 
 * @returns 
 */
export const getProduct = (id:any): ThunkAction<Promise<void>,RootState,unknown,AnyAction> =>
    async (dispatch: ThunkDispatch<RootState,unknown,AnyAction>): Promise<void> => {
        try {
            dispatch({
                type: GET_SINGLE_PRODUCT_REQUEST
            })
            const getProductService = await ProductsService.get(id).then((response) => {
                if (response.status === 200 && response.data) {
                    dispatch({
                        type: GET_SINGLE_PRODUCT_SUCCESS,
                        payload: response.data
                    })
                } else {
                    dispatch({
                        type: GET_SINGLE_PRODUCT_FAILURE,
                        payload: response.data
                    })
                }
            });
        } catch (error) {
            console.log("Error",error);
        }
        
}

/**
 * updateProduct
 * @param id 
 * @param product 
 * @returns 
 */
export const updateProductDetails = (id:any, product:IProducts, productImage:any): ThunkAction<Promise<void>,RootState,unknown,AnyAction> =>
    async (dispatch: ThunkDispatch<RootState,unknown,AnyAction>): Promise<void> => {
        try {
            dispatch({
                type: UPDATE_PRODUCT_REQUEST
            })
            const updateProductService = await ProductsService.update(id,product).then((response) => {
                if (response.status === 200 && response.data) {
                    dispatch({
                        type: UPDATE_PRODUCT_SUCCESS,
                        payload: response.data
                    })
                    uploadProductImage(productImage, response.data.productId);
                } else {
                    dispatch({
                        type: UPDATE_PRODUCT_FAILURE,
                        payload: response.data
                    })
                }
            });
        } catch (error) {
            console.log("Error",error);
        }
        
}

/**
 * Delete Product
 * @param id 
 * @returns 
 */
export const deleteProduct = (id:any): ThunkAction<Promise<void>,RootState,unknown,AnyAction> =>
    async (dispatch: ThunkDispatch<RootState,unknown,AnyAction>): Promise<void> => {
        try {
            dispatch({
                type: DELETE_PRODUCT_REQUEST
            })
            const deleteProductService = await ProductsService.remove(id).then((response) => {
                if (response.status === 200 && response.data) {
                    dispatch({
                        type: DELETE_PRODUCT_SUCCESS,
                        payload: response.data
                    })
                } else {
                    dispatch({
                        type: DELETE_PRODUCT_FAILURE,
                        payload: response.data
                    })
                }
            });
        } catch (error) {
            console.log("Error",error);
        }
        
}


