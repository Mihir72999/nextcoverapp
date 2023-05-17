import cartSlice from './reducer'
import { configureStore ,combineReducers} from '@reduxjs/toolkit'
import {productApi} from './findproducts'
import actionSlice from './action'
import {dataApi} from './razorpay'
const reducer = combineReducers({
carts:cartSlice,
add:actionSlice,

[productApi.reducerPath]:productApi.reducer,
[dataApi.reducerPath]:dataApi.reducer


})
const store = configureStore({
reducer,
middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productApi.middleware , dataApi.middleware )

})
export default store;