import React from 'react'
import { ThunkAction,ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { USER_DATA_FAILURE, USER_DATA_REQUEST, USER_DATA_SUCCESS, USER_EDIT_FAILURE, USER_EDIT_REQUEST, USER_EDIT_SUCCESS, USER_LOGIN_FAILURE, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS } from '../Constants/UserConstants'
import { RootState } from '../store'
import AuthService from '../Services/AuthService'
import UserService from '../Services/UserService'
import Users from '../Types/Users'


export const login = (
    email:string, 
    password:string): ThunkAction<Promise<void>,RootState,unknown,AnyAction> => 
    async (dispatch: ThunkDispatch<RootState,unknown,AnyAction>): Promise<void> => {
    try {
        dispatch({ 

            type: USER_LOGIN_REQUEST 
        
        })
        //try login
        //if login success, dispatch success action
        //if login fail, dispatch failure action
       const response =  await AuthService.authenticate({email, password})  
       console.log("See response",response);
       const userData = {username: response.user.name, email: response.user.email}
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: userData
        })
        localStorage.setItem("userInfo", JSON.stringify(userData))
    } catch (error) {
        //if login fail, dispatch failure action
        dispatch({
            type: USER_LOGIN_FAILURE,
            payload: error
        })

    }
    

}


export const getUsers = (): ThunkAction<Promise<void>,RootState,unknown,AnyAction> =>
    async (dispatch: ThunkDispatch<RootState,unknown,AnyAction>): Promise<void> => {
        try {
            dispatch({
                type: USER_DATA_REQUEST
            })
            //try get users
            //if get users success, dispatch success action
            //if get users fail, dispatch failure action
            const response = await UserService.getAllUsers().then((response) => {
                if (response.status === 200 && response.data) {
                    dispatch({
                        type: USER_DATA_SUCCESS,
                        payload: response.data
                    })
                } else {
                    dispatch({
                        type: USER_DATA_FAILURE,
                        payload: response.data
                    })
                }
            });
            console.log("See response",response);
          
        } catch (error) {
            //if get users fail, dispatch failure action
            dispatch({
                type: USER_DATA_FAILURE,
                payload: error
            })
        }
    }


    export const getOneUser = (id:any): ThunkAction<Promise<void>,RootState,unknown,AnyAction> =>
    async (dispatch: ThunkDispatch<RootState,unknown,AnyAction>): Promise<void> => {
        try {
            dispatch({
                type: USER_EDIT_REQUEST
            })
            //try get a user
            //if success, dispatch success action
            //if  failure, dispatch failure action
            const response = await UserService.getAUser(id).then((response) => {
                if (response.status === 200 && response.data) {
                    dispatch({
                        type: USER_EDIT_SUCCESS,
                        payload: response.data
                    })
                } else {
                    dispatch({
                        type: USER_EDIT_FAILURE,
                        payload: response.data
                    })
                }
            });
            console.log("See response",response);
          
        } catch (error) {
            //if failure, dispatch failure action
            dispatch({
                type: USER_DATA_FAILURE,
                payload: error
            })
        }
    }


    export const createUser = (user:Users): ThunkAction<Promise<void>,RootState,unknown,AnyAction> =>
        async (dispatch: ThunkDispatch<RootState,unknown,AnyAction>): Promise<void> => {
            try {
                dispatch({
                    type: USER_DATA_REQUEST
                })
                //try create user
                //if create user success, dispatch success action
                //if create user fail, dispatch failure action
                const response = await UserService.createAUser(user).then((response) => {
                    if (response.status === 200 && response.data) {
                        dispatch({
                            type: USER_DATA_SUCCESS,
                            payload: response.data
                        })
                    } else {
                        dispatch({
                            type: USER_DATA_FAILURE,
                            payload: response.data
                        })
                    }
                });
                console.log("See response",response);
            } catch (error) {
                //if create user fail, dispatch failure action
                dispatch({
                    type: USER_DATA_FAILURE,
                    payload: error
                })
            }

        }

export const updateUser =(id:any, user:Users): ThunkAction<Promise<void>,RootState,unknown,AnyAction> =>
    async (dispatch: ThunkDispatch<RootState,unknown,AnyAction>): Promise<void> => {
        try {
            dispatch({
                 type: USER_UPDATE_REQUEST
            })
            //try update user
            //if update user success, dispatch success action
            //if update user fail, dispatch failure action
            const response = await UserService.updateAUser(id, user).then((response) => {
                if (response.status === 200 && response.data) {
                    dispatch({
                        type: USER_UPDATE_SUCCESS,
                        payload: response.data
                    })
                } else {
                    dispatch({
                        type: USER_UPDATE_SUCCESS,
                        payload: response.data
                    })
                }
            });
            console.log("See response",response);
        } catch (error) {
            //if update user fail, dispatch failure action
            dispatch({
                type: USER_DATA_FAILURE,
                payload: error
            })
        }
    }


export const logout = (): ThunkAction<Promise<void>,RootState,unknown,AnyAction> =>
    async (dispatch: ThunkDispatch<RootState,unknown,AnyAction>): Promise<void> => {
        try {
            dispatch({
                type: USER_LOGOUT 
            })
            const logoutSession = await AuthService.logout();
            localStorage.removeItem("userInfo");
        } catch (error) {
            console.log("Error",error);
        }
        
}

