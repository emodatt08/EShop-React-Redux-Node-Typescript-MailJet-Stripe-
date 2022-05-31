
import { USER_CREATE_FAILURE, USER_CREATE_REQUEST, USER_CREATE_SUCCESS, USER_DATA_FAILURE, USER_DATA_REQUEST, USER_DATA_SUCCESS, USER_EDIT_FAILURE, USER_EDIT_REQUEST, USER_EDIT_SUCCESS, USER_LOGIN_FAILURE, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_UPDATE_FAILURE, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS } from "../Constants/UserConstants"
import Users from "../Types/Users"

export interface UserState{
    isLoggedIn?: boolean,
    isLoading?: boolean,
    isUpdated?: boolean,
    error?: boolean,
    user?:Users,
    userEdit?:Users,
    userUpdate?:Users,
    userInfo: { username?: string, email?: string},
    users?: Users[]
}

interface Action{
    type: string,
    payload?: string
}

export const UserReducer = (state:UserState = {userInfo: {}},  action: Action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {
                newInfo:{},
                isLoading: true
            }
        case USER_LOGIN_SUCCESS:
            return {
                isLoading: false,
                isLoggedIn: true,
                userInfo: action.payload
            }
        case USER_LOGIN_FAILURE:
            return {
                isLoading: false,
                isLoggedIn: false,
                error: action.payload
            }
        case USER_LOGOUT:
            return {
                isLoggedIn: false,
                user: null
            }

        case USER_DATA_REQUEST:
            return {
                isLoading: true
            }

        case USER_DATA_SUCCESS:
            return {
                isLoading: false,
                isLoggedIn: true,
                users: action.payload,
                userInfo:localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')! ) : undefined
            }

        case USER_DATA_FAILURE:
            return {
                isLoading: false,
                error: action.payload
            }

        case USER_CREATE_REQUEST:
            return {
                newInfo: action.payload,
                isLoading: true
            }
        case USER_CREATE_SUCCESS:
            return {
                isLoading: false,
                isLoggedIn: true,
                user: action.payload
            }
        case USER_CREATE_FAILURE:
            return {
                isLoading: false,
                isLoggedIn: false,
                error: action.payload
            }
        
        case USER_EDIT_REQUEST:
            return {
                isLoading: true
            }
    
        case USER_EDIT_SUCCESS:
            return {
                isLoading: false,
                userEdit: action.payload,
                userInfo:localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')! ) : undefined
            }
        case USER_EDIT_FAILURE:
            return {
                isLoading: false,
                error: action.payload
            }
        case USER_UPDATE_REQUEST:
            return {
                newInfo: action.payload,
                isLoading: true
            }
        case USER_UPDATE_SUCCESS:
            return {
                isLoading: false,
                isLoggedIn: true,
                isUpdated: true,
                userUpdate: action.payload
            }
        case USER_UPDATE_FAILURE:
            return {
                isLoading: false,
                isLoggedIn: false,
                error: action.payload
            }

        default:
            return state
    }
}
