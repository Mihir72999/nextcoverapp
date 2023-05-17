import { createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
export const fetchData = createAsyncThunk('fetchData',async()=>{
    const data = await axios.get(`/api/geproduct`)
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
       .addCase(fetchData.fulfilled,(state,{payload}/*,product*/)=>{
    //     if(product){
       
    //    payload.filter(e=>e.name == product)

    //     }
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
