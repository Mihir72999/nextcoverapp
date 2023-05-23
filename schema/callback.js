import mongoose from "mongoose";

const callbackSchema = new mongoose.Schema({
    razorpay_payment_id :{
        type:String,
        require:true
    },
     razorpay_order_id :{
        type:String,
        require:true
    } ,
      razorpay_signature:{
        type:String,
        require:true
    }
})
mongoose.models = {}

export default  mongoose.model('callback' , callbackSchema)