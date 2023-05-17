import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String
    },
    id:{
        type:Number,
        unique:true

    },
    brand:{
        type:String,
        require:true
    },
    brandmodel:{
     type:String,
     require:true
    },
    price:{
        type:Number,
        require:true
    },
    image:{
    type:String,
    require:true
    },
    availableQty:{
        type:Number,
        require:true
    }
},{timestamps:true}
)

mongoose.models = {}
export default  mongoose.model('product',  productSchema)