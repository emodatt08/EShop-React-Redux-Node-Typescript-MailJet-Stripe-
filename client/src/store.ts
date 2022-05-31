
import { combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import { UserReducer } from './Reducers/UserReducer';
import { ProductReducer } from './Reducers/ProductReducer';
import { OrderReducer } from './Reducers/OrderReducer';
import {PaymentReducer} from './Reducers/PaymentReducer';


let userInfoInStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')! ) : undefined;

const initialState = {
    userLogin: {userInfo: userInfoInStorage},
    products: {products: []},
    orders: {orders: []},
    users: {users: []},
    payment: {payment: []}
} as {};
const reducers = combineReducers({
  userLogin: UserReducer,
  products: ProductReducer,
  orders: OrderReducer,
  users: UserReducer,
  payment: PaymentReducer
});

export const store = configureStore({
    reducer: reducers,
    preloadedState: initialState,
    middleware: [thunkMiddleware],
});


export default store;

export type RootState = ReturnType<typeof store.getState>; 