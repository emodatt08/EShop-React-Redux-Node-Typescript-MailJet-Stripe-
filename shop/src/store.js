import {combineReducers} from "redux";
import thunkMiddleware from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import {productReducer} from "./reducers/ProductReducer";

const initialState = {
    products: {products: []},
};

const reducers = combineReducers({
    products: productReducer,

})

export const store = configureStore({
    reducer: reducers,
    preloadedState: initialState,
    middleware: [thunkMiddleware],
});


export default store;