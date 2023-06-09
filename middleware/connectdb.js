import mongoose from "mongoose"

const connectdb= handler => async(req , res) =>{
 try{
    if(mongoose.connections[0].readyState){
    return handler(req,res)
    }
   await  mongoose.connect(process.env.MONGODB_URI,{ useNewUrlParser:true,useUnifiedTopology:true,
    })
    console.log("mongodb connected")
     return handler(req,res)  
    } catch(error){
        console.log(error)
    } 
}

export default connectdb 
