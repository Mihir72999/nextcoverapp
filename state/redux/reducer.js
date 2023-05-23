import { createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
export const fetchData = createAsyncThunk('cart',async(body)=>{
    const data = await axios.post(`/api/order` , body)
    return await data.data
})
const cartSlice = createSlice({
    name:'cart',
    initialState:{
     isLoading:true,
    
     datas:[],
     isError:false
    },
    reducers:{
     
    },
    extraReducers:builder=>{
       builder
       .addCase(fetchData.pending,(state)=>{
        state.isLoading = true
       })
       .addCase(fetchData.fulfilled,(state,{payload})=>{
    
        state.isLoading = false
        state.datas = payload
        state.isError = false
       })
       .addCase(fetchData.rejected,(state)=>{
        state.isLoading = false
        state.isError = true 
       })
    }
})
export default cartSlice.reducer
