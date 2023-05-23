import mongoose from "mongoose";

                                                 
const orderSchema = new mongoose.Schema({
    fname:{
        type:String,                                                  
        require:true 
    },
  lname:{
    type:String,
    require:true
  },
  street:{
    type:String,
    require:true 
  },
  town:{
    type:String,
    require:true 
  },
  pin:{
    type:Number,
    require:true 
  },
  phone:{
    type:Number,
    require:true 
  },
  email:{
    type:String,
    require:true
  },
  orderId:{
    type:String,
    require:true
  },
  state:{
    type:String,
    require:true 
    
  },
 
   product:{
    type:Object,
    require:true
   }
},{timestamps:true})

mongoose.models = {}
export default mongoose.model('order' , orderSchema)