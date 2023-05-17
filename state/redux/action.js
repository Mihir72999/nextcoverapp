
import { createSlice } from "@reduxjs/toolkit";
const actionSlice = createSlice({
  name: 'action',
  initialState: [],
  reducers: {
    addProduct(state, action) {
      state.push(action.payload)

      const data = state.reduce((item ,total)=>{
        const {amount } = total
        item = item + amount 
        return item
      },0)

     
      try{
        
        localStorage.setItem('cart', JSON.stringify(state))
        localStorage.setItem('length', JSON.stringify(state.length))
         localStorage.setItem('subtotal',JSON.stringify(data))
      

      }catch(error){
      console.log(error)
      localStorage.clear()
      }
      
    },
    deletedata(state, action) {
      
      state = JSON.parse(localStorage.getItem('cart'))
      const data = state.filter(item => item._id !== action.payload)
      const datas = data.reduce((item ,total)=>{
        const {amount } = total
        item = item + amount 
        return item
      },0)
 
     
      try{
        localStorage.setItem('cart', JSON.stringify(data))

        if (state.length > 0) {
          localStorage.setItem('length', JSON.stringify(state.length - 1))
  
        } else {
          localStorage.setItem('length', JSON.stringify(state.length))
  
        }
        localStorage.setItem('subtotal',JSON.stringify(datas))
      
      
      }catch(error){
     console.log(error)
     localStorage.clear()
      }
    },

    



  }
})

export default actionSlice.reducer
export const { addProduct, deletedata, addQuantity , removeQuantity } = actionSlice.actions